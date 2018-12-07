import Sound from "./Sound";
import AudioBuffer from "./AudioBuffer";
import Visualizer from "./Visualizer";
import "./index.css";
import ch from "./assets/ch.mp3";
import an from "./assets/andro.mp3";
import cf from "./assets/cf.mp3";
import a from "./assets/a.mp3";

let sound,
	visualizer,
	audioCtx,
	justLoaded = false,
	started = false;

document.addEventListener("DOMContentLoaded", async () => {
	const musicUrls = [a];

	audioCtx = new AudioContext();

	init(audioCtx);
});

function init(audioCtx) {
	const fileInput = document.querySelector("#fileInput");
	const chooseFileBtn = document.querySelector("#chooseFile");

	fileInput.setAttribute("accept", "audio/mp3");

	chooseFileBtn.addEventListener("click", handleClick => {
		fileInput.click();
	});

	fileInput.addEventListener("change", event => {
		const files = event.target.files;

		if (files.length > 0) {
			const reader = new FileReader();

			reader.onload = event => {
				var result = event.target.result;

				audioCtx.decodeAudioData(result, buffer => {
					sound = new Sound(audioCtx, buffer);
					sound.init();

					visualizer = new Visualizer(sound.getAnalyser());

					visualizer.initDraw();
					sound.play();

					justLoaded = true;
				});
			};

			reader.readAsArrayBuffer(files[0]);

		}
	});
}

// document.addEventListener("click", () => {
// 	if (justLoaded && !started) {
// 		sound.play();
// 		visualizer.initDraw();
// 		started = true;
// 	}
// });
