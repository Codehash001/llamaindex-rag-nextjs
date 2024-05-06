
import {PineconeVectorStore, VectorStoreIndex } from "llamaindex";
import { checkRequiredEnvVars } from "./shared";

export async function getDataSource() {
  checkRequiredEnvVars();
  const store = new PineconeVectorStore(
    {'indexName': process.env.PINECONE_INDEX_NAME}
  );
  return await VectorStoreIndex.fromVectorStore(store);
}
