import { ContextChatEngine, Settings } from "llamaindex";
import {PineconeVectorStore } from "llamaindex/storage/vectorStore/PineconeVectorStore";
import {VectorStoreIndex} from "llamaindex"
import { checkRequiredEnvVars } from "./shared";

export async function createChatEngine() {
  checkRequiredEnvVars();
  const store = new PineconeVectorStore();
  const index =  await VectorStoreIndex.fromVectorStore(store);
  if (!index) {
    throw new Error(
      `StorageContext is empty - call 'npm run generate' to generate the storage first`,
    );
  }
  const retriever = index.asRetriever();
  retriever.similarityTopK = process.env.TOP_K
    ? parseInt(process.env.TOP_K)
    : 3;

  return new ContextChatEngine({
    chatModel: Settings.llm,
    retriever,
  });
}
