import Sound from "./Sound";
import AudioBuffer from "./AudioBuffer";
import Visualizer from "./Visualizer";
import "./index.css";
import aria from "./assets/ar.mp3";
import zig from "./assets/zigzag.mp3";

const context = new AudioContext();
document.addEventListener("click", async () => {
  const musicUrls = [aria, zig];

  const audioBuffer = new AudioBuffer(context, musicUrls);
  await audioBuffer.loadAll();

  const sound = new Sound(context, audioBuffer.getSoundByIndex(1));
  sound.play();

  const canvasCtx = getCanvasContext();
  var visualizer = new Visualizer(canvasCtx, sound.getAnalyser());
  visualizer.initDraw();
});

function getCanvasContext() {
  const canvas = document.getElementById("canvas");
  return canvas.getContext("2d");
}
