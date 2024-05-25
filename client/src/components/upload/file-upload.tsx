"use client";
import React from "react";
import {Inbox, Loader2} from "lucide-react";
import {useDropzone} from "react-dropzone";
import {toast, Toaster} from "sonner";
import {useMutation} from "react-query";
import {useRouter} from "next/navigation";
import {createChat} from "@/components/upload/api/create-chat.api";
import {uploadFile} from "@/components/upload/api/upload-file.api";

const FileUpload = () => {
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (uploadResponse: { fileUrl: string; fileKey: string }) => {
      setUploading(true);
      try {
        return await createChat(uploadResponse);
      } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
      } finally {
        setUploading(false);
      }
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File too large');
        return;
      }

      mutate(await uploadFile(file), {
        onSuccess: ({ chat_id }) => {
          toast.success('Chat created!');
          router.push(`/chat/${chat_id}`);
        },
        onError: (error) => {
          console.error('Error creating chat:', error);
          toast.error('Error creating chat');
        },
      });
    },
  });
  return (
    <>
      <div className="p-2 bg-white rounded-xl">
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
          })}
        >
          <input {...getInputProps()} />
          {uploading || isLoading ? (
            <>
              {/* loading state */}
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              <p className="mt-2 text-sm text-slate-400">
                Wait for the file to be uploaded...
              </p>
            </>
          ) : (
            <>
              <Inbox className="w-10 h-10 text-blue-500" />
              <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
