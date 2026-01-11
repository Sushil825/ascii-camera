import { useRef, useState, useEffect, useCallback } from 'react';

export const useAsciiCamera = (charSet, resolution, invert) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [asciiArt, setAsciiArt] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const [fps, setFps] = useState(0);
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsActive(true);
        setError('');
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsActive(false);
    setAsciiArt('');
    setFps(0);
  }, []);

  const convertToAscii = useCallback((timestamp) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationRef.current = requestAnimationFrame(convertToAscii);
      return;
    }

    // Calculate FPS
    frameCountRef.current++;
    if (timestamp - lastTimeRef.current >= 1000) {
      setFps(frameCountRef.current);
      frameCountRef.current = 0;
      lastTimeRef.current = timestamp;
    }

    const ctx = canvas.getContext('2d');
    const charHeight = resolution * 2;
    const cols = Math.floor(video.videoWidth / resolution);
    const rows = Math.floor(video.videoHeight / charHeight);
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    let ascii = '';
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let brightnessSum = 0;
        let pixelCount = 0;
        
        for (let py = 0; py < charHeight; py++) {
          for (let px = 0; px < resolution; px++) {
            const imgX = x * resolution + px;
            const imgY = y * charHeight + py;
            
            if (imgX < canvas.width && imgY < canvas.height) {
              const index = (imgY * canvas.width + imgX) * 4;
              const r = pixels[index];
              const g = pixels[index + 1];
              const b = pixels[index + 2];
              
              const brightness = (r + g + b) / 3;
              brightnessSum += brightness;
              pixelCount++;
            }
          }
        }
        
        let avgBrightness = brightnessSum / pixelCount;
        if (invert) avgBrightness = 255 - avgBrightness;
        
        const charIndex = Math.floor((avgBrightness / 255) * (charSet.length - 1));
        ascii += charSet[charIndex];
      }
      ascii += '\n';
    }
    
    setAsciiArt(ascii);
    setDimensions({ cols, rows });
    animationRef.current = requestAnimationFrame(convertToAscii);
  }, [charSet, resolution, invert]);

useEffect(() => {
  if (isActive && videoRef.current) {
    // Start converting immediately when video is ready
    const startConverting = () => {
      console.log('Video loaded, starting conversion');
      convertToAscii(0);
    };
    
    // Check if video is already ready
    if (videoRef.current.readyState >= 2) {
      startConverting();
    } else {
      videoRef.current.addEventListener('loadeddata', startConverting);
    }
    
    return () => {
      videoRef.current?.removeEventListener('loadeddata', startConverting);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  } else {
    // Stop animation when not active
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }
}, [isActive, convertToAscii]);

  const downloadFrame = useCallback(() => {
    if (!asciiArt) return;
    const blob = new Blob([asciiArt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-frame-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [asciiArt]);

  return {
    videoRef,
    canvasRef,
    asciiArt,
    isActive,
    error,
    fps,
    dimensions,
    startCamera,
    stopCamera,
    downloadFrame
  };
};