"use client";
import React from "react";
import { Inbox } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from "sonner";
import { useMutation } from "react-query";
import { uploadFile } from "@/components/upload/api/upload-file.api";

const FileUpload = () => {
  const [uploading, setUploading] = React.useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (file: File) => {
      setUploading(true);
      try {
        return await uploadFile(file);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      } finally {
        setUploading(false);
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

      mutate(file, {
        onSuccess: ({ fileUrl }) => {
          // Handle successful upload
          toast.success("File uploaded successfully!");
          console.log("File URL:", fileUrl);
        },
        onError: (error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file");
        },
      });
    },
  });
  return (
    <>
      <Toaster position="top-right" />
      <div className="p-2 bg-white rounded-xl">
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
          })}
        >
          <input {...getInputProps()} />
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
