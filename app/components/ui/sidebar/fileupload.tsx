'use client'

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, PackagePlus , Loader } from 'lucide-react';
import { Button } from '../button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading , setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploading(true);
    await handleUpload(e);
    await handleIngest();
    await handledelete();
    setFiles([]);
    setUploading(false);
    toast('Feeding dataset complete ✅')
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true, // enable multiple file upload
  });

  const handleIngest  = async () => {
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    } 
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (files.length === 0) return;

    try {
      const data = new FormData();
      files.forEach((file, index) => {
        data.append(`file${index}`, file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    } 
  }

  const handledelete = async () => {
    try {
      const res = await fetch('/api/removeFiles', {
        method: 'DELETE',
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    } 
  }

  return (
    <form onSubmit={onSubmit} className='h-full flex flex-col space-y-2'>
      <div {...getRootProps()} className='border-2 border-dashed border-black p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200'>
        <input {...getInputProps()} />
        <Upload size={48} />
        <p className='text-center'>Drag & drop some files here, or click to select files</p>
      </div>
      <ul className='w-full max-h-[300px] overflow-y-auto flex-grow'>
      {files.map((file, index) => (
        <li key={index} className='border rounded-md px-3 py-1 text-sm flex space-x-2 items-center mb-1'>
          <div><File size={16} /></div>
            <div>{file.name}</div>
        </li>
      ))}
      </ul>
      <div className="flex-grow w-full items-start">
        {/* Additional content */}
      </div>
      <Button variant='default' size='sm' className={ uploading?'w-full opacity-45' : 'w-full'}><input type="submit" value={uploading?"Creating dataset":"Create dataset"}/>
        {uploading?
        <Loader size={18} className='ml-2 animate-spin'/> :
        <PackagePlus size={18} className='ml-2'/>}
      </Button>
    </form>
  );
};

export default FileUpload;
