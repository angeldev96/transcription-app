import React from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  subLabel?: string;
  selectedFile: File | null;
  onRemoveFile: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = 'video/*',
  label = 'Click to upload a video',
  subLabel = 'MP4, MOV, AVI, and other video formats',
  selectedFile,
  onRemoveFile
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
      {selectedFile ? (
        <div className="space-y-2">
          <div className="flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-blue-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium">{selectedFile.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <button
            type="button"
            onClick={onRemoveFile}
            className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            Remove
          </button>
        </div>
      ) : (
        <div>
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <svg 
              className="w-12 h-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {subLabel}
            </span>
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload; 