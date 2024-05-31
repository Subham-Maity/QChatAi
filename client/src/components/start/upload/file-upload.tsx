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
import { FileUploadProps } from "@/components/start/types/file-upload.types";
import { useAppSelector } from "@/store/redux/useSelector";
import { RootState } from "@/store/redux/store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { toast as Toast } from "sonner";
import { ContentSchema } from "@/components/start/validation/form.validation";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileUpload: React.FC<FileUploadProps> = ({ userId }) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState();

  // Get the title and description from Redux state
  const { title, description } = useAppSelector(
    (state: RootState) => state.chat,
  );
  const { mutate, isLoading: isUploading } = useMutation({
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
        Toast.success("Chat created!");
        router.push(`/chat/${chatResponse.id}`);
      } catch (error) {
        console.error("Error creating chat:", error);
        Toast.error("Error creating chat");
      } finally {
        Toast.dismiss();
      }
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
      Toast.error("Error uploading file");
      Toast.dismiss();
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
    let formData = { title, description };

    // Assign default values if title or description is empty
    if (!title) {
      formData = {
        ...formData,
        title: "........................................",
      };
    }

    if (!description) {
      formData = {
        ...formData,
        description:
          "............................................................",
      };
    }

    const validationResult = ContentSchema.safeParse(formData);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map(
        (issue) => issue.message,
      );
      Toast.error(errorMessages.join(", "));
      return;
    }

    if (selectedFile) {
      if (!selectedFile.type.includes("pdf")) {
        Toast.error("Please select a PDF file");
        return;
      }

      Toast.loading("Uploading...");
      mutate(selectedFile);
    } else {
      Toast.error("Please select a PDF file");
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
          <Button
            onPress={onOpen}
            color="primary"
            variant="faded"
            className="mt-2"
          >
            <ScanEye className="mr-2 h-4 w-4" />
            Pdf Preview
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
            backdrop={"blur"}
          >
            <ModalContent className="bg-transparent border-none ">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Your PDF Preview
                  </ModalHeader>
                  <ModalBody>
                    <Document file={filePreview}>
                      <Page
                        renderAnnotationLayer={false}
                        pageNumber={1}
                        width={300}
                        loading={"Please select a page."}
                        renderTextLayer={false}
                      />
                    </Document>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <div className="p-4 space-y-2 ">
            <p className="font-medium">{selectedFile.name}</p>
            <div className="flex items-center justify-between">
              <p className="text-stone-500 dark:text-stone-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button
                onPress={handleUpload}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                disabled={isUploading}
                isLoading={isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
