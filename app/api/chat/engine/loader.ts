import { SimpleDirectoryReader } from "llamaindex/readers/SimpleDirectoryReader";

export const DATA_DIR = "./data";

export async function getDocuments() {
  return await new SimpleDirectoryReader().loadData({
    directoryPath: DATA_DIR,
  });
}
