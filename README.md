# ASCII Camera

A lightweight web application that converts your webcam feed into ASCII art in real-time. Built with React and Vite.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://sushil825.github.io/ascii-camera/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- **Real-time Conversion** - Smooth 30+ FPS ASCII video rendering
- **6 Color Themes** - Green, cyan, white, yellow, magenta, and red terminal styles
- **5 Character Sets** - From simple to detailed ASCII representations
- **Adjustable Resolution** - Balance between detail and performance (4-12px blocks)
- **Font Size Control** - Customize ASCII output size (4-14px)
- **Invert Mode** - Flip light and dark areas for different artistic effects
- **Download Frames** - Save ASCII art snapshots as text files
- **Performance Stats** - Real-time FPS, resolution, and character count
- **Responsive Design** - Works on desktop and mobile devices
- **Zero Dependencies** - Pure React with minimal external libraries

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser with WebRTC support
- Webcam or camera device

### Installation

```bash
# Clone the repository
git clone https://github.com/sushil825/ascii-camera.git

# Navigate to project directory
cd ascii-camera

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

## Usage

1. Click "Start Camera" and allow camera permissions
2. Adjust settings in the control panel:
   - **Character Set**: Choose ASCII characters for rendering
   - **Resolution**: Control detail level (lower = more detail)
   - **Font Size**: Adjust output size
   - **Color Theme**: Select terminal-style colors
   - **Invert Colors**: Flip brightness mapping
3. Click "Download Frame" to save current ASCII art as `.txt` file

## Built With

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Lucide React](https://lucide.dev/) - Icon library
- HTML5 Canvas API - Image processing
- WebRTC getUserMedia - Camera access

## Project Structure

```
ascii-camera/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Customization

### Character Sets

The application includes five character sets:

- **Standard**: `@%#*+=-:. `
- **Blocks**: `█▓▒░ `
- **Detailed**: `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`. `
- **Simple**: `@#%*+=-. `
- **Binary**: `01 `

### Adding New Color Themes

Edit the `colors` array in `App.jsx`:

```javascript
const colors = [
  { name: 'Your Color', value: '#hexcode' },
  // Add more colors here
];
```

### Adjusting Default Settings

Modify the initial state values in `App.jsx`:

```javascript
const [resolution, setResolution] = useState(6);  // Block size
const [fontSize, setFontSize] = useState(8);      // Font size
const [color, setColor] = useState('#00ff00');    // Default color
const [invert, setInvert] = useState(true);       // Invert mode
```

## Deployment

### GitHub Pages

```bash
# Build and deploy
npm run deploy
```

Your site will be live at `https://yourusername.github.io/ascii-camera/`

### Vercel / Netlify

Connect your GitHub repository to Vercel or Netlify. Both platforms automatically detect Vite projects and configure the build settings.

## Browser Compatibility

- Chrome 53+
- Firefox 36+
- Safari 11+
- Edge 79+
- Mobile browsers with WebRTC support

## Performance

The application achieves 30+ FPS on most modern devices. Performance depends on:

- Resolution setting (lower = faster)
- Character set complexity
- Camera resolution
- Device processing power

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Potential Improvements

- Video recording functionality
- Edge detection modes
- Color ASCII output (RGB values)
- Image upload mode
- Batch processing
- WebGL acceleration
- Keyboard shortcuts

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was created as an educational exploration of:
- HTML5 Canvas API for image processing
- WebRTC for camera access
- Real-time video manipulation
- React for UI development

## Contact

Sushil Chettri - [@sushil825](https://github.com/sushil825)

Project Link: [https://github.com/sushil825/ascii-camera](https://github.com/sushil825/ascii-camera)

---

If you found this project helpful, consider giving it a star on GitHub.
