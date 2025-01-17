'use client'

import { ButtonCustom } from "@/components/custom/Button"
import { FileUploader, FileUploaderContent, FileInput, FileUploaderItem } from "@/components/custom/FileUpload";
import { IconArrowBack, IconFileUpload, IconFile } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";

export default function FileUploadDocumentation() {

  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const codestring = `
"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Dispatch,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useDropzone,
  DropzoneState,
  FileRejection,
  DropzoneOptions,
} from "react-dropzone";
import { toast } from "sonner";
import { Trash2 as RemoveIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type DirectionOptions = "rtl" | "ltr" | undefined;

type FileUploaderContextType = {
  dropzoneState: DropzoneState;
  isLOF: boolean;
  isFileTooBig: boolean;
  removeFileFromSet: (index: number) => void;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  orientation: "horizontal" | "vertical";
  direction: DirectionOptions;
};

const FileUploaderContext = createContext<FileUploaderContextType | null>(null);

export const useFileUpload = () => {
  const context = useContext(FileUploaderContext);
  if (!context) {
    throw new Error("useFileUpload must be used within a FileUploaderProvider");
  }
  return context;
};

type FileUploaderProps = {
  value: File[] | null;
  reSelect?: boolean;
  onValueChange: (value: File[] | null) => void;
  dropzoneOptions: DropzoneOptions;
  orientation?: "horizontal" | "vertical";
};

export const FileUploader = forwardRef<
  HTMLDivElement,
  FileUploaderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      dropzoneOptions,
      value,
      onValueChange,
      reSelect,
      orientation = "vertical",
      children,
      dir,
      ...props
    },
    ref,
  ) => {
    const [isFileTooBig, setIsFileTooBig] = useState(false);
    const [isLOF, setIsLOF] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const {
      accept = {
        "image/*": [".jpg", ".jpeg", ".png", ".gif"],
      },
      maxFiles = 1,
      maxSize = 4 * 1024 * 1024,
      multiple = true,
    } = dropzoneOptions;

    const reSelectAll = maxFiles === 1 ? true : reSelect;
    const direction: DirectionOptions = dir === "rtl" ? "rtl" : "ltr";

    const removeFileFromSet = useCallback(
      (i: number) => {
        if (!value) return;
        const newFiles = value.filter((_, index) => index !== i);
        onValueChange(newFiles);
      },
      [value, onValueChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!value) return;

        const moveNext = () => {
          const nextIndex = activeIndex + 1;
          setActiveIndex(nextIndex > value.length - 1 ? 0 : nextIndex);
        };

        const movePrev = () => {
          const nextIndex = activeIndex - 1;
          setActiveIndex(nextIndex < 0 ? value.length - 1 : nextIndex);
        };

        const prevKey =
          orientation === "horizontal"
            ? direction === "ltr"
              ? "ArrowLeft"
              : "ArrowRight"
            : "ArrowUp";

        const nextKey =
          orientation === "horizontal"
            ? direction === "ltr"
              ? "ArrowRight"
              : "ArrowLeft"
            : "ArrowDown";

        if (e.key === nextKey) {
          moveNext();
        } else if (e.key === prevKey) {
          movePrev();
        } else if (e.key === "Enter" || e.key === "Space") {
          if (activeIndex === -1) {
            dropzoneState.inputRef.current?.click();
          }
        } else if (e.key === "Delete" || e.key === "Backspace") {
          if (activeIndex !== -1) {
            removeFileFromSet(activeIndex);
            if (value.length - 1 === 0) {
              setActiveIndex(-1);
              return;
            }
            movePrev();
          }
        } else if (e.key === "Escape") {
          setActiveIndex(-1);
        }
      },
      [value, activeIndex, removeFileFromSet],
    );

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const files = acceptedFiles;

        if (!files) {
          toast.error("file error , probably too big");
          return;
        }

        const newValues: File[] = value ? [...value] : [];

        if (reSelectAll) {
          newValues.splice(0, newValues.length);
        }

        files.forEach((file) => {
          if (newValues.length < maxFiles) {
            newValues.push(file);
          }
        });

        onValueChange(newValues);

        if (rejectedFiles.length > 0) {
          for (let i = 0; i < rejectedFiles.length; i++) {
            if (rejectedFiles[i].errors[0]?.code === "file-too-large") {
              toast.error(
                \`File is too large. Max size is \${maxSize / 1024 / 1024}MB\`,
              );
              break;
            }
            if (rejectedFiles[i].errors[0]?.message) {
              toast.error(rejectedFiles[i].errors[0].message);
              break;
            }
          }
        }
      },
      [reSelectAll, value],
    );

    useEffect(() => {
      if (!value) return;
      if (value.length === maxFiles) {
        setIsLOF(true);
        return;
      }
      setIsLOF(false);
    }, [value, maxFiles]);

    const opts = dropzoneOptions
      ? dropzoneOptions
      : { accept, maxFiles, maxSize, multiple };

    const dropzoneState = useDropzone({
      ...opts,
      onDrop,
      onDropRejected: () => setIsFileTooBig(true),
      onDropAccepted: () => setIsFileTooBig(false),
    });

    return (
      <FileUploaderContext.Provider
        value={{
          dropzoneState,
          isLOF,
          isFileTooBig,
          removeFileFromSet,
          activeIndex,
          setActiveIndex,
          orientation,
          direction,
        }}
      >
        <div
          ref={ref}
          tabIndex={0}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "grid w-full focus:outline-none overflow-hidden ",
            className,
            {
              "gap-2": value && value.length > 0,
            },
          )}
          dir={dir}
          {...props}
        >
          {children}
        </div>
      </FileUploaderContext.Provider>
    );
  },
);

FileUploader.displayName = "FileUploader";

export const FileUploaderContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { orientation } = useFileUpload();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn("w-full px-1")}
      ref={containerRef}
      aria-description="content file holder"
    >
      <div
        {...props}
        ref={ref}
        className={cn(
          "flex rounded-xl gap-1",
          orientation === "horizontal" ? "flex-raw flex-wrap" : "flex-col",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
});

FileUploaderContent.displayName = "FileUploaderContent";

export const FileUploaderItem = forwardRef<
  HTMLDivElement,
  { index: number } & React.HTMLAttributes<HTMLDivElement>
>(({ className, index, children, ...props }, ref) => {
  const { removeFileFromSet, activeIndex, direction } = useFileUpload();
  const isSelected = index === activeIndex;
  return (
    <div
      ref={ref}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-6 p-1 justify-between cursor-pointer relative",
        className,
        isSelected ? "bg-muted" : "",
      )}
      {...props}
    >
      <div className="font-medium leading-none tracking-tight flex items-center gap-1.5 h-full w-full">
        {children}
      </div>
      <button
        type="button"
        className={cn(
          "absolute",
          direction === "rtl" ? "top-1 left-1" : "top-1 right-1",
        )}
        onClick={() => removeFileFromSet(index)}
      >
        <span className="sr-only">remove item {index}</span>
        <RemoveIcon className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
      </button>
    </div>
  );
});

FileUploaderItem.displayName = "FileUploaderItem";

export const FileInput = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { dropzoneState, isFileTooBig, isLOF } = useFileUpload();
  const rootProps = isLOF ? {} : dropzoneState.getRootProps();
  return (
    <div
      ref={ref}
      {...props}
      className={\`relative w-full \${
        isLOF ? "opacity-50 cursor-not-allowed " : "cursor-pointer "
      }\`}
    >
      <div
        className={cn(
          \`w-full rounded-lg duration-300 ease-in-out
         \${
           dropzoneState.isDragAccept
             ? "border-green-500"
             : dropzoneState.isDragReject || isFileTooBig
               ? "border-red-500"
               : "border-gray-300"
         }\`,
          className,
        )}
        {...rootProps}
      >
        {children}
      </div>
      <Input
        ref={dropzoneState.inputRef}
        disabled={isLOF}
        {...dropzoneState.getInputProps()}
        className={\`\${isLOF ? "cursor-not-allowed" : ""}\`}
      />
    </div>
  );
});

FileInput.displayName = "FileInput";

    `

  const codestringtutorial = `
    <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={dropZoneConfig}
        className="relative bg-background rounded-lg p-2 max-w-[40%]"
    >
        <FileInput
            id="fileInput"
            className="bg-[#F3F5F6]"
        >
            <div className="flex items-center justify-center flex-col py-10 w-full ">
                <IconFileUpload className="text-[#3199E8] h-10 w-10" strokeWidth={'1.25'} />
                <div className="mb-1 text-sm space-y-3 text-center pt-2">
                    <span className="font-semibold">Drag and drop files to upload or</span>
                    <div className="flex h-10 justify-center items-center w-[50%] m-auto bg-[#323C43] text-[white] rounded-sm">Browse Files</div>
                    <p className="text-xs text-[#4A5863]">
                        maximum file size may not exceed 5MB each
                    </p>
                </div>
            </div>
        </FileInput>
        <div className="flex flex-col">
            <FileUploaderContent>
                {files &&
                    files.length > 0 &&
                    files.map((file, i) => (
                        <FileUploaderItem key={i} index={i} className="flex-auto border-b-2 border-[#E5E8EB] p-4 hover:bg-white hover:cursor-default">
                            <IconFile className="text-[#3199E8]" size={16} />
                            <span className="text-[#3199E8] text-md font-normal">{file.name}</span>
                        </FileUploaderItem>
                    ))}
            </FileUploaderContent>
        </div>
    </FileUploader>
    `

  return (
    <div className="container mx-auto py-12 p-4">
      <div className="flex justify-between items-center pb-2 text-black px-4 pr-8">
        <h4 className="text-[1.75rem] font-bold font-outfit leading-8">File Upload Documentation</h4>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to component list</ButtonCustom>
          </div>
        </div>
      </div>
      <div className="flex py-4">
        <div className="my-auto px-8 py-4">
          <p className="text-base text-[#323C43] font-semibold font-outfit">Component Code</p>
          <SyntaxHighlighter
            language="javascript"
            style={dracula}
            wrapLongLines
            customStyle={{ padding: '8px', borderRadius: '8px', width: '70rem', maxHeight: '23rem' }}
          >
            {codestring}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="flex py-4">
        <div className="my-auto px-8 py-4">
          <p className="text-base text-[#323C43] font-semibold font-outfit">How To Use</p>
          <SyntaxHighlighter
            language="javascript"
            style={dracula}
            wrapLongLines
            customStyle={{ padding: '8px', borderRadius: '8px', maxWidth: '70rem', maxHeight: '23rem' }}
          >
            {codestringtutorial}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="flex flex-row gap-4 m-auto p-2 rounded-md shadow items-center justify-center">
        <p className="font-bold font-outfit text-2xl text-[#323C43]">Demo: </p>
        <FileUploader
          value={files}
          onValueChange={setFiles}
          dropzoneOptions={dropZoneConfig}
          className="relative bg-background rounded-lg p-2 max-w-[40%]"
        >
          <FileInput
            id="fileInput"
            className="bg-[#F3F5F6]"
          >
            <div className="flex items-center justify-center flex-col py-10 w-full ">
              <IconFileUpload className="text-[#3199E8] h-10 w-10" strokeWidth={'1.25'} />
              <div className="mb-1 text-sm space-y-3 text-center pt-2">
                <span className="font-semibold">Drag and drop files to upload or</span>
                <div className="flex h-10 justify-center items-center w-[50%] m-auto bg-[#323C43] text-[white] rounded-sm">Browse Files</div>
                <p className="text-xs text-[#4A5863]">
                  maximum file size may not exceed 5MB each
                </p>
              </div>
            </div>
          </FileInput>
          <div className="flex flex-col">
            <FileUploaderContent>
              {files &&
                files.length > 0 &&
                files.map((file, i) => (
                  <FileUploaderItem key={i} index={i} className="flex-auto border-b-2 border-[#E5E8EB] p-4 hover:bg-white hover:cursor-default">
                    <IconFile className="text-[#3199E8]" size={16} />
                    <span className="text-[#3199E8] text-md font-normal">{file.name}</span>
                  </FileUploaderItem>
                ))}
            </FileUploaderContent>
          </div>
        </FileUploader>
      </div>
    </div>
  )
};