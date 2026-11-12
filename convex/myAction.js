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

async function generateGeminiText(prompt) {
  const apiKey =
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "No Gemini API key found. Set GOOGLE_API_KEY in Convex environment variables."
    );
  }

  const models = ["gemini-3.8-flash", "gemini-3.6-flash"];
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    }),
  };
  const maxRetries = 3;
  const waitBeforeRetry = (attempt) =>
    new Promise((resolve) =>
      setTimeout(resolve, 1000 * 2 ** attempt)
    );
  let response;
  let primaryModelError;

  for (const [modelIndex, model] of models.entries()) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      try {
        response = await fetch(url, request);
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await waitBeforeRetry(attempt);
        continue;
      }

      if (response.status !== 503 || attempt === maxRetries) break;

      await response.text();
      await waitBeforeRetry(attempt);
    }

    if (response.status === 503 && modelIndex === 0) {
      primaryModelError = await response.text();
      continue;
    }
    break;
  }

  if (!response.ok) {
    const error = await response.text();
    if (primaryModelError) {
      throw new Error(
        `Gemini 3.8 Flash failed [503]: ${primaryModelError}\n` +
          `Gemini 3.6 Flash fallback failed [${response.status}]: ${error}`
      );
    }
    throw new Error(
      `Gemini generation failed [${response.status}]: ${error}`
    );
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("");

  if (!text) {
    throw new Error("Gemini returned no generated text.");
  }

  return text;
}

export const generateContent = action({
  args: {
    prompt: v.string(),
  },
  handler: async (_ctx, args) => generateGeminiText(args.prompt),
});

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
    if (!args.query.trim()) {
      throw new Error("Search query cannot be empty.");
    }

    const vectorStore = new ConvexVectorStore(makeEmbeddings(), { ctx });

    const resultOne = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((q) => q.metadata.fileId == args.fileId);

    console.log(resultOne);
    return JSON.stringify(resultOne);
  },
});
