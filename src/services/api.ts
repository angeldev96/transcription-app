export interface TranscriptionResult {
  transcript: string;
  error?: string;
}

export async function transcribeVideo(file: File): Promise<TranscriptionResult> {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('video', file);
    
    // Send the request to our API route
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Transcription request failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Transcription error:', error);
    return {
      transcript: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 