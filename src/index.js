import Sound from "./Sound";
import AudioBuffer from "./AudioBuffer";
import Visualizer from "./Visualizer";
import "./index.css";
import ch from "./assets/ch.mp3";

let sound,
	visualizer,
	audioCtx,
	justLoaded = false;

document.addEventListener("DOMContentLoaded", async () => {
	const musicUrls = [ch];
	const audioBuffer = new AudioBuffer(new AudioContext(), musicUrls);
	await audioBuffer.loadAll();

	audioCtx = new AudioContext();
	sound = new Sound(audioCtx, audioBuffer.getSoundByIndex(0));
	sound.init();

	visualizer = new Visualizer(sound.getAnalyser());

	justLoaded = true;
});

document.addEventListener("click", () => {
	sound.play();
	visualizer.initDraw();
});
