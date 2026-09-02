import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "./embeddings.js";
import "dotenv/config";

export const vectorStore = async (docs, collectionName) => {
  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: process.env.QDRANT_URL,
    collectionName,
  });
  return vectorStore;
};
