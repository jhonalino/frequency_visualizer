import Sound from "./Sound";
import AudioBuffer from "./AudioBuffer";
//import Visualizer from "./Visualizer";
import "./index.css";
import aria from "./assets/ar.mp3";
import zig from "./assets/zigzag.mp3";
document.addEventListener("click", async () => {
  const context = new AudioContext();
  const musicUrls = [aria, zig];
  const audioBuffer = new AudioBuffer(context, musicUrls);
  await audioBuffer.loadAll();
  const sound = new Sound(context, audioBuffer.getSoundByIndex(1));
  sound.play();
});
