import { useState, useEffect } from 'react';

interface ApiEndpointConfigProps {
  onEndpointChange: (endpoint: string) => void;
  defaultEndpoint?: string;
}

export default function ApiEndpointConfig({ onEndpointChange, defaultEndpoint = 'https://5884-35-201-150-234.ngrok-free.app' }: ApiEndpointConfigProps) {
  const [endpoint, setEndpoint] = useState(defaultEndpoint);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load saved endpoint from localStorage on component mount
  useEffect(() => {
    const savedEndpoint = localStorage.getItem('transcriptionApiEndpoint');
    if (savedEndpoint) {
      setEndpoint(savedEndpoint);
      onEndpointChange(savedEndpoint);
    }
  }, [onEndpointChange]);
  
  const handleSave = () => {
    // Validate URL format and remove trailing slashes
    try {
      const url = new URL(endpoint);
      const cleanUrl = url.origin + url.pathname.replace(/\/+$/, '');
      
      localStorage.setItem('transcriptionApiEndpoint', cleanUrl);
      onEndpointChange(cleanUrl);
      setIsEditing(false);
    } catch {
      alert('Please enter a valid URL');
    }
  };
  
  const handleReset = () => {
    setEndpoint(defaultEndpoint);
    localStorage.setItem('transcriptionApiEndpoint', defaultEndpoint);
    onEndpointChange(defaultEndpoint);
    setIsEditing(false);
  };
  
  return (
    <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
      <h3 className="text-sm font-medium mb-2">API Endpoint Configuration</h3>
      
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter ngrok base URL (e.g., https://5884-35-201-150-234.ngrok-free.app)"
          />
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className="px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              onClick={handleReset}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Reset to Default
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="truncate text-xs text-gray-600 dark:text-gray-400 max-w-[80%]">
            {endpoint}
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
} 