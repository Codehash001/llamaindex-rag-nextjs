import { writeFile, mkdir, access } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { dirname } from 'path';

async function directoryExists(path: string) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files: File[] = [];
  const fileKeys = Array.from(data.keys()); // Convert iterable to array

  for (const key of fileKeys) {
    const file = data.get(key) as File;
    files.push(file);
  }

  if (files.length === 0) {
    return NextResponse.json({ success: false });
  }

  const dataDir = 'data';
  const dataDirExists = await directoryExists(dataDir);

  if (!dataDirExists) {
    try {
      // Create the "data" folder directory if it doesn't exist
      await mkdir(dataDir, { recursive: true });
    } catch (error) {
      console.error('Error creating "data" directory:', error);
      return NextResponse.json({ success: false });
    }
  }

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `${dataDir}/${file.name}`;
    await writeFile(path, buffer);
    console.log(`successfully uploaded file to ${path}`);
  }

  return NextResponse.json({ success: true });
}
