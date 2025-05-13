import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingStateProps {
  fileName: string;
  fileSize: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ fileName, fileSize }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6">
      <LoadingSpinner size="large" />
      
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1">Processing your video</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This may take a few moments depending on the file size
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md max-w-xs mx-auto">
          <p className="font-medium text-sm mb-1 truncate">{fileName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {(fileSize / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-md">
        <p>Your video is being processed for transcription.</p>
        <p>The audio is being extracted and analyzed with NVIDIA Parakeet.</p>
      </div>
    </div>
  );
};

export default LoadingState; 