export interface TranscriptionResult {
  transcript: string;
  error?: string;
}

// Utility function to ensure URL is properly formatted
function formatApiEndpoint(baseUrl: string): string {
  // Remove trailing slashes from base URL
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  // Append the API path with a leading slash
  return `${cleanBaseUrl}/transcribe_video/`;
}

export async function transcribeVideo(file: File, apiEndpoint?: string): Promise<TranscriptionResult> {
  try {
    // Create a FormData object to send the file (it will be ignored by this example endpoint, but we send it for consistency with the form)
    const formData = new FormData();
    formData.append('uploaded_file', file); // The key 'file' matches what the original API endpoint might expect
    
    // Use provided apiEndpoint or fall back to default
    const baseEndpoint = apiEndpoint || 'https://5884-35-201-150-234.ngrok-free.app';
    // Format URL with correct path
    const endpoint = formatApiEndpoint(baseEndpoint);
    
    // Send the request to the example audio transcription endpoint
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData, 
      // Note: For this specific example endpoint, the body/formData is ignored by the server,
      // but sending it doesn't hurt and keeps the call structure similar.
    });
    
    if (!response.ok) {
      let errorDetail = 'Transcription request failed';
      try {
        const errorData = await response.json();
        // FastAPI often returns errors in a 'detail' field
        errorDetail = errorData.detail || errorData.error || 'Transcription request failed due to server error';
      } catch {
        // If parsing error JSON fails, use the status text or a generic message
        errorDetail = response.statusText || `Server error: ${response.status}`;
      }
      throw new Error(errorDetail);
    }
    
    const data = await response.json();
    
    // The example Kaggle API endpoint returns { filename: string, transcription_text: string }
    // We need to map this to { transcript: string, error?: string }
    if (data.transcription_text !== undefined) { // Check for existence of the key
      return { transcript: data.transcription_text };
    } else {
      // Handle cases where transcription_text might be missing
      throw new Error('Transcription data (transcription_text) not found in response');
    }
  } catch (error) {
    console.error('Transcription error in api.ts:', error);
    return {
      transcript: '', // Ensure transcript is not null
      error: error instanceof Error ? error.message : 'Unknown error occurred during transcription process'
    };
  }
} 