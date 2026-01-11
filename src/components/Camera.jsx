import React from 'react';
import { Camera as CameraIcon } from 'lucide-react';

export const Camera = ({ videoRef, canvasRef }) => {
  return (
    <>
      <video ref={videoRef} className="hidden" autoPlay playsInline />
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
};