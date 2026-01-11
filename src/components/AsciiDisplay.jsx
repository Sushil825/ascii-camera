import React from 'react';
import { Camera as CameraIcon } from 'lucide-react';

export const AsciiDisplay = ({ asciiArt, color, fontSize }) => {
  if (!asciiArt) {
    return (
      <div className="text-center">
        <CameraIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
        <p className="text-xl text-purple-200">Click "Start Camera" to begin</p>
        <p className="text-sm text-purple-300 mt-2">Make sure to allow camera permissions</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto max-h-[70vh]">
      <pre
        className="font-mono whitespace-pre leading-none"
        style={{
          color: color,
          fontSize: `${fontSize}px`,
          lineHeight: `${fontSize}px`
        }}
      >
        {asciiArt}
      </pre>
    </div>
  );
};