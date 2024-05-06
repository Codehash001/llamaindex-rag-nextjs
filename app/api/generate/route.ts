import * as dotenv from "dotenv";
import {
    storageContextFromDefaults,
  } from "llamaindex/storage/StorageContext";
import {VectorStoreIndex} from "llamaindex"
import {PineconeVectorStore } from "llamaindex/storage/vectorStore/PineconeVectorStore";
import { getDocuments } from "../chat/engine/loader";
import { initSettings } from "../chat/engine/settings";
import { checkRequiredEnvVars } from "../chat/engine/shared";
import { NextRequest, NextResponse } from 'next/server';

dotenv.config();

async function loadAndIndex() {
  // load objects from storage and convert them into LlamaIndex Document objects
  const documents = await getDocuments();

  // create vector store
  const vectorStore = new PineconeVectorStore();

  // create index from all the Documents and store them in Pinecone
  console.log("Start creating embeddings...");
  const storageContext = await storageContextFromDefaults({ vectorStore });
  await VectorStoreIndex.fromDocuments(documents, { storageContext });
  console.log("Successfully created embeddings and saved to your Pinecone index.");
}

export async function POST(request: NextRequest) {
  try {
    // Check if the request contains necessary authentication or any other validations

    // Execute the script
    checkRequiredEnvVars();
    initSettings();
    await loadAndIndex();
    
    return NextResponse.json({ success: true, message: "Storage generation complete." });
  } catch (error) {
    console.error("Error generating storage:", error);
    return NextResponse.json({ success: false, message: "Error generating storage." });
  }
}
