import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { v } from "convex/values";
import { Embeddings } from "@langchain/core/embeddings";

// ── Custom embeddings class that calls Gemini REST API directly ───────────────
// Bypasses @langchain/google-genai SDK which has broken URL construction for
// embedding models in v0.2.x. Uses fetch directly to hit v1beta endpoint.
class GeminiEmbeddings extends Embeddings {
  constructor(apiKey) {
    super({});
    this.apiKey = apiKey;
    this.model = "gemini-embedding-001";
  }

  async _embed(text) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:embedContent?key=${this.apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: `models/${this.model}`,
        content: { parts: [{ text }] },
        outputDimensionality: 768,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini embedding failed [${res.status}]: ${err}`);
    }
    const json = await res.json();
    return json.embedding.values;
  }

  async embedQuery(text) {
    return this._embed(text);
  }

  async embedDocuments(texts) {
    return Promise.all(texts.map((t) => this._embed(t)));
  }
}

// Shared factory
function makeEmbeddings() {
  const apiKey =
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "No Gemini API key found. Set GOOGLE_API_KEY in Convex environment variables."
    );
  }

  return new GeminiEmbeddings(apiKey);
}

// ── INGEST ────────────────────────────────────────────────────────────────────
export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      makeEmbeddings(),
      { ctx }
    );
    return "Completed..";
  },
});

// ── SEARCH ────────────────────────────────────────────────────────────────────
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(makeEmbeddings(), { ctx });

    const resultOne = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((q) => q.metadata.fileId == args.fileId);

    console.log(resultOne);
    return JSON.stringify(resultOne);
  },
});
