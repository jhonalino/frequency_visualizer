import Sound from "./Sound";
import AudioBuffer from "./AudioBuffer";
import Visualizer from "./Visualizer";
import "./index.css";
//import aria from "./assets/ar.mp3";
import zig from "./assets/zigzag.mp3";

let sound,
  visualizer,
  audioCtx,
  justLoaded = false;

document.addEventListener("DOMContentLoaded", async () => {
  const musicUrls = [zig];

  const audioBuffer = new AudioBuffer(new AudioContext(), musicUrls);
  await audioBuffer.loadAll();

  audioCtx = new AudioContext();
  sound = new Sound(audioCtx, audioBuffer.getSoundByIndex(0));
  sound.init();
  const canvasCtx = getCanvasContext();

  visualizer = new Visualizer(canvasCtx, sound.getAnalyser());

  justLoaded = true;
  document.querySelector(".info").classList.remove("is-hidden");
  document.querySelector(".spinner").classList.add("is-hidden");
});

document.addEventListener("click", () => {
  if (justLoaded) {
    justLoaded = false;
    sound.play(0);
    visualizer.initDraw();
    document.querySelector(".info").classList.add("pause");
  } else if (audioCtx) {
    if (audioCtx.state === "running") {
      audioCtx.suspend().then(function() {
        document.querySelector(".info").classList.remove("pause");
      });
    } else if (audioCtx.state === "suspended") {
      audioCtx.resume().then(function() {
        document.querySelector(".info").classList.add("pause");
      });
    }
  }
});

function getCanvasContext() {
  const canvas = document.getElementById("canvas");
  return canvas.getContext("2d");
}
