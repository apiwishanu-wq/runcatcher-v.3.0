const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const ctx = overlay.getContext('2d');

// Load models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream)
    .catch(err => console.error('Camera error:', err));
}

video.addEventListener('play', () => {
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(overlay, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video, new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceDescriptors();
    
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    const resized = faceapi.resizeResults(detections, displaySize);
    resized.forEach(d => {
      const box = d.detection.box;
      ctx.strokeStyle = '#0f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
    });
  }, 100);
});
