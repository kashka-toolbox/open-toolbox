import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FilePlusIcon, UpdateIcon } from "@radix-ui/react-icons";


interface DropAreaProps {
  onFilesAdded: (files: File[]) => void;
}

export default function DropArea({ onFilesAdded }: DropAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    onFilesAdded(Array.from(event.dataTransfer.files));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesAdded(Array.from(event.target.files));
    }
  };

  return (
    <Card className={`border-2 rounded-lg border-primary p-4 cursor-pointer transition-all hover:bg-primary text-center ${
      isDragging ? "bg-primary" : ""
    }`}>
      <CardContent
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" multiple onChange={handleFileSelect} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="block cursor-pointer">
          <FilePlusIcon className="w-12 h-12 mx-auto mt-4 mb-2" />
          <p className="">{} Drag & drop files here, or click to select</p>
        </label>
      </CardContent>
    </Card>
  );
}