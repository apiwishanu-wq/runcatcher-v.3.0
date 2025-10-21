# RunCatcher

Real-time face and running detection using webcam/DroidCam. Captures snapshots of running faces and displays them in a numbered list in the browser.

## Features

- **Real-time Face Detection**: Uses face-api.js for accurate face detection
- **Motion Tracking**: Calculates motion speed to detect running
- **Webcam/DroidCam Support**: Works with any camera source
- **Automatic Capture**: Snaps photos when running motion is detected
- **Beautiful UI**: Library-themed interface with clean design
- **Local Storage**: Saves captured images to `/captures/` directory

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- A webcam or DroidCam setup
- Modern web browser with camera permissions

### Installation

1. **Install Dependencies**
   ```bash
   cd runcatcher
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## Usage

1. **Grant Camera Permissions**: Allow the browser to access your camera when prompted
2. **Start Detection**: Click the "Start Detection" button
3. **Move Around**: Walk or run in front of the camera to trigger captures
4. **View Results**: Captured runners appear in the numbered list on the right

## API Endpoints

- `GET /` - Main application interface
- `POST /capture` - Capture and save runner image
- `GET /captures` - List all captured images
- `GET /health` - Server health check

## Configuration

### Motion Sensitivity

Adjust the motion threshold in `script.js`:
```javascript
this.motionThreshold = 0.1; // Lower = more sensitive
```

### Capture Cooldown

Set minimum time between captures:
```javascript
this.captureCooldown = 2000; // 2 seconds in milliseconds
```

## File Structure

```
runcatcher/
├── index.html          # Main HTML interface
├── script.js           # Face detection and motion tracking
├── style.css           # Library theme styling
├── server.js           # Node.js backend server
├── package.json        # Dependencies
├── captures/            # Saved runner images
└── README.md           # This file
```

## Technical Details

### Face Detection
- Uses face-api.js TinyFaceDetector for fast, accurate detection
- Real-time processing with bounding box visualization
- Motion tracking between frames

### Motion Calculation
- Compares face positions between consecutive frames
- Calculates motion speed in pixels per second
- Configurable threshold for running detection

### Image Processing
- Captures full video frame
- Crops to face area with padding
- Saves as JPEG with 80% quality
- Base64 encoding for transmission

## Troubleshooting

### Camera Issues
- Ensure camera permissions are granted
- Check if another application is using the camera
- Try refreshing the page

### Face Detection Issues
- Ensure good lighting
- Keep face clearly visible in frame
- Check browser console for errors

### Server Issues
- Verify Node.js is installed correctly
- Check if port 3000 is available
- Review server logs for errors

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Requires modern browser with:
- Camera API support
- Canvas API support
- ES6+ JavaScript support

## License

MIT License - feel free to use and modify as needed.

## Deploy to GitHub Pages (Static Only)

This project includes a fully static version that runs on GitHub Pages without any backend.

Files used: `pages.html`, `pages.js`, and `style.css`.

### Quick Start (Local)
```bash
open /Users/boon/coad1/runcatcher/pages.html
```

### GitHub Pages Steps
1. Commit and push the repository to GitHub
2. In GitHub: Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` (or your default) / folder: `/` (root)
5. Click Save
6. Ensure the homepage file is named `index.html`.
   - Option A (recommended): Copy `pages.html` to `index.html` for the Pages branch
   - Option B: Create a `gh-pages` branch where `index.html` is a copy of `pages.html`

Example (from repo root):
```bash
# make Pages use the static app
cp pages.html index.html
git add index.html pages.html pages.js style.css
git commit -m "feat: static GitHub Pages build"
git push origin main
```

Open your site: `https://<your-user>.github.io/<repo-name>/`.

Notes:
- Face models load from public CDNs; no server required.
- Captures are stored client-side and downloadable as a ZIP.
- If models fail to load due to network/CDN policies, refresh or try another browser.
