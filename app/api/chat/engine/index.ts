
import {PineconeVectorStore, VectorStoreIndex } from "llamaindex";
import { checkRequiredEnvVars } from "./shared";

export async function getDataSource() {
  checkRequiredEnvVars();
  const store = new PineconeVectorStore(
    {'indexName': 'chatbot',
      'namespace':'llama-new'}
  );
  return await VectorStoreIndex.fromVectorStore(store);
}
