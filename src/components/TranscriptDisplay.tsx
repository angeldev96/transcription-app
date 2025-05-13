import React from 'react';

interface TranscriptDisplayProps {
  transcript: string;
  onReset: () => void;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, onReset }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Transcription Result</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto whitespace-pre-wrap text-sm max-h-[400px]">
        {transcript}
      </pre>
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
        >
          Transcribe Another Video
        </button>
        <button
          onClick={() => {
            const blob = new Blob([transcript], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transcript.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors"
        >
          Download Transcript
        </button>
      </div>
    </div>
  );
};

export default TranscriptDisplay; 