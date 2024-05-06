import { readdir, unlink, access} from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { dirname } from 'path';

async function deleteFilesInDirectory(directory: string) {
  try {
    const files = await readdir(directory);
    for (const file of files) {
      await unlink(`${directory}/${file}`);
      console.log(`Deleted file: ${directory}/${file}`);
    }
    return true;
  } catch (error) {
    console.error('Error deleting files:', error);
    return false;
  }
}

async function directoryExists(path: string) {
    try {
      await access(path);
      return true;
    } catch (error) {
      return false;
    }
  }

export async function DELETE(request: NextRequest) {
  const dataDir = 'data';
  const dataDirExists = await directoryExists(dataDir);

  if (!dataDirExists) {
    console.log('No files to delete.');
    return NextResponse.json({ success: true });
  }

  const deleted = await deleteFilesInDirectory(dataDir);

  if (deleted) {
    console.log('All files deleted successfully.');
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
