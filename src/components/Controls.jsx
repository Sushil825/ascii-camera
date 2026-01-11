import React from 'react';
import { Camera, Square, Download, Settings } from 'lucide-react';

const charSets = {
  standard: '@%#*+=-:. ',
  blocks: '█▓▒░ ',
  detailed: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`. ',
  simple: '@#%*+=-. ',
  binary: '01 '
};

const colors = [
  { name: 'Green', value: '#00ff00' },
  { name: 'Cyan', value: '#00ffff' },
  { name: 'Magenta', value: '#ff00ff' },
  { name: 'Yellow', value: '#ffff00' },
  { name: 'White', value: '#ffffff' },
  { name: 'Red', value: '#ff6b6b' }
];

export const Controls = ({
  isActive,
  startCamera,
  stopCamera,
  downloadFrame,
  charSet,
  setCharSet,
  resolution,
  setResolution,
  fontSize,
  setFontSize,
  color,
  setColor,
  invert,
  setInvert,
  showStats,
  setShowStats,
  fps,
  dimensions
}) => {
  return (
    <aside className="lg:col-span-1 space-y-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Controls
        </h2>

        {/* Camera Controls */}
        <div className="space-y-2 mb-4">
          {!isActive ? (
            <button
              onClick={startCamera}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Start Camera
            </button>
          ) : (
            <>
              <button
                onClick={stopCamera}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Square className="w-5 h-5" />
                Stop Camera
              </button>
              <button
                onClick={downloadFrame}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Frame
              </button>
            </>
          )}
        </div>

        {/* Character Set */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Character Set</label>
          <select
            value={Object.keys(charSets).find(key => charSets[key] === charSet)}
            onChange={(e) => setCharSet(charSets[e.target.value])}
            className="w-full bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg px-3 py-2 text-sm"
          >
            <option value="standard">Standard</option>
            <option value="blocks">Blocks</option>
            <option value="detailed">Detailed</option>
            <option value="simple">Simple</option>
            <option value="binary">Binary</option>
          </select>
        </div>

        {/* Resolution */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Resolution: {resolution}x{resolution * 2}px
          </label>
          <input
            type="range"
            min="4"
            max="16"
            step="2"
            value={resolution}
            onChange={(e) => setResolution(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Font Size */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min="4"
            max="12"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Color Theme */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Color Theme</label>
          <div className="grid grid-cols-3 gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`h-10 rounded-lg transition ${
                  color === c.value ? 'ring-2 ring-white ring-offset-2 ring-offset-purple-700' : ''
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Invert Toggle */}
        <label className="flex items-center gap-2 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={invert}
            onChange={(e) => setInvert(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Invert Colors</span>
        </label>

        {/* Stats Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showStats}
            onChange={(e) => setShowStats(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Show Stats</span>
        </label>
      </div>

      {/* Stats Panel */}
      {showStats && isActive && (
        <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20">
          <h3 className="text-sm font-semibold mb-2">Performance</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-200">FPS:</span>
              <span className="font-mono">{fps}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Resolution:</span>
              <span className="font-mono">{dimensions.cols}×{dimensions.rows}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Characters:</span>
              <span className="font-mono">{(dimensions.cols * dimensions.rows).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};