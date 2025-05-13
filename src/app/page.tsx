'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import LoadingSpinner from '@/components/LoadingSpinner';
import TranscriptDisplay from '@/components/TranscriptDisplay';
import LoadingState from '@/components/LoadingState';
import { transcribeVideo } from '@/services/api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.includes('video/')) {
      setError('Please select a valid video file');
      return;
    }
    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a video file');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      const result = await transcribeVideo(file);
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      setTranscript(result.transcript);
    } catch (err) {
      setError('An error occurred during processing. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setTranscript(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Video Transcription App</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload a video file to get an audio transcription with timecodes
        </p>
      </header>

      <main className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {transcript ? (
          <TranscriptDisplay transcript={transcript} onReset={handleReset} />
        ) : isUploading && file ? (
          <LoadingState fileName={file.name} fileSize={file.size} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUpload 
              onFileSelect={handleFileSelect}
              selectedFile={file}
              onRemoveFile={() => setFile(null)}
            />
            
            {error && (
              <div className="text-red-600 text-sm font-medium">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={!file || isUploading}
              className={`w-full py-2 px-4 font-semibold rounded-md transition-colors ${
                !file || isUploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="small" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Transcribe Video'
              )}
            </button>
          </form>
        )}
      </main>

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Powered by Next.js and NVIDIA Parakeet</p>
      </footer>
    </div>
  );
}
