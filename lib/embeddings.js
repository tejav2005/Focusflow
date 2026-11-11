import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function embedTexts(texts) {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2"
    );
  }

  const output = await embedder(texts, {
    pooling: "mean",
    normalize: true,
  });

  return output.tolist(); // array of vectors
}