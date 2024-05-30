"use client";
import React, { useState } from "react";
import { ScanEye, Upload, UploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { createChat } from "@/components/start/api/create-chat.api";
import { uploadFile } from "@/components/start/api/upload-file.api";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { FileUploadProps } from "@/components/start/types/file-upload.types";
import { useAppSelector } from "@/store/redux/useSelector";
import { RootState } from "@/store/redux/store";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileUpload: React.FC<FileUploadProps> = ({ userId }) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  // Get the title and description from Redux state
  const { title, description } = useAppSelector(
    (state: RootState) => state.chat,
  );
  const { mutate } = useMutation({
    mutationFn: async (file: File) => {
      try {
        return await uploadFile(file);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    },
    onSuccess: async (uploadResponse) => {
      try {
        const chatRequestData = {
          ...uploadResponse,
          userId,
          title,
          description,
        };
        const chatResponse = await createChat(chatRequestData);
        toast.success("Chat created!");
        router.push(`/chat/${chatResponse.id}`);
      } catch (error) {
        console.error("Error creating chat:", error);
        toast.error("Error creating chat");
      }
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large");
        return;
      }
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    },
  });

  const handleUpload = () => {
    if (selectedFile) {
      mutate(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div
        {...getRootProps({
          className:
            "w-full h-32 bg-stone-100 border-2 p-4 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center space-y-2 cursor-pointer transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:border-stone-600 dark:hover:bg-stone-700",
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="w-8 h-8 text-stone-500 dark:text-stone-400" />
        <p className="text-stone-500 dark:text-stone-400">
          Drag and drop files here or click to upload
        </p>
      </div>
      {selectedFile && (
        <div className="w-full bg-stone-300 border pl-4 items-center rounded-lg overflow-hidden shadow-sm dark:bg-stone-600 dark:border-stone-800 mt-2">
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive" className="mt-2">
                <ScanEye className="mr-2 h-4 w-4" />
                Pdf Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-transparent border-none max-w-xs mx-auto h-64 flex items-center justify-center">
              <Document file={filePreview}>
                <Page
                  renderAnnotationLayer={false}
                  pageNumber={1}
                  width={300}
                  loading={"Please select a page."}
                  renderTextLayer={false}
                />
              </Document>
            </DialogContent>
          </Dialog>

          <div className="p-4 space-y-2 ">
            <p className="font-medium">{selectedFile.name}</p>
            <div className="flex items-center justify-between">
              <p className="text-stone-500 dark:text-stone-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button
                onClick={handleUpload}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
