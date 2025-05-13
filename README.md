# Video Transcription App

A lightweight Next.js web application that allows users to upload video files for audio transcription. The frontend is designed to work with a remote Kaggle notebook running NVIDIA Parakeet for accurate transcription with timecodes.

## Features

- Simple, intuitive user interface for video uploads
- No login required - just upload and get transcriptions
- Responsive design that works on mobile and desktop
- Download transcriptions as text files
- View transcriptions with proper timecodes

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend** (to be implemented): Python-based Kaggle notebook with NVIDIA Parakeet for audio transcription

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/transcription-app.git
   cd transcription-app
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
transcription-app/
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   │   ├── FileUpload.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── TranscriptDisplay.tsx
│   └── services/          # API services
│       └── api.ts
├── public/                # Static assets
├── README.md
├── package.json
└── tsconfig.json
```

## Future Implementation

In the complete implementation, the app will:

1. Upload video files to a remote Kaggle notebook endpoint (e.g., via ngrok)
2. Process the video in chunks for audio extraction
3. Use NVIDIA Parakeet for high-quality audio transcription
4. Return a complete transcript with accurate timecodes

## Deployment

The application is designed to be deployed on Vercel. To deploy your own instance:

1. Push your code to a GitHub repository
2. Import the project in the [Vercel Dashboard](https://vercel.com/import)
3. Vercel will automatically build and deploy your application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
