import Sound from "./Sound";
import "./index.css";

new Sound();
const body = document.getElementsByTagName("body");

const context = new AudioContext();
const now = context.currentTime;
const gain = context.createGain();
const source = context.createBufferSource();
const analyser = context.createAnalyser();
analyser.smoothingTimeConstant = 0.65;
document.addEventListener("click", () => {
  let buffer = [];
  let request = new XMLHttpRequest();
  request.open("get", "./zigzag.mp3", true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      source.buffer = buffer;
      source.connect(analyser);
      analyser.connect(gain);
      gain.connect(context.destination);
      source.start();
      analyser.fftSize = Math.pow(2, 11);
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      var canvas = document.getElementById("canvas");
      var canvasCtx = canvas.getContext("2d");
      var WIDTH = (canvas.width = innerWidth);
      var HEIGHT = (canvas.height = innerHeight);

      function draw() {
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.translate(WIDTH / 2, HEIGHT / 2);
        const radius = Math.max(dataArray[3] / 255, 0.8) * 200;
        canvasCtx.rotate(2 * Math.PI * 0.0001);
        canvasCtx.save();
        for (var i = 0; i < dataArray.length; i++) {
          if (dataArray[i]) {
            const barWidth = radius * Math.tan((2 * Math.PI) / bufferLength); //DIVIDE the circle into equal segments
            const barHeight = dataArray[i] / 2;
            canvasCtx.rotate(Math.atan2(barWidth, radius));
            canvasCtx.save();
            canvasCtx.translate(0, radius);
            canvasCtx.strokeStyle = `rgb(255,67,54)`;
            canvasCtx.strokeRect(-barWidth / 2, 0, barWidth, barHeight);
            canvasCtx.restore();
          }
        }
        canvasCtx.restore();
        canvasCtx.translate(-WIDTH / 2, -(HEIGHT / 2));
        requestAnimationFrame(draw);
      }
      draw();
    });
  };
  request.send();
});
