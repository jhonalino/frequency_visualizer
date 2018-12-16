import Sound from "./Sound";
import Visualizer from "./Visualizer";
import "./index.css";

let sound,
	visualizer,
	audioCtx

document.addEventListener("DOMContentLoaded", async () => {
	audioCtx = new AudioContext();

	init(audioCtx);
});

function init(audioCtx) {
	const fileInput = document.querySelector("#fileInput");
	const chooseFileBtn = document.querySelector("#chooseFile");

	fileInput.setAttribute("accept", "audio/mp3");

	chooseFileBtn.addEventListener("click", _ => {
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

					visualizer = new Visualizer(sound.getAnalyser(), audioCtx);

					visualizer.initDraw();
					sound.play();

					justLoaded = true;
				});
			};

			reader.readAsArrayBuffer(files[0]);

		}
	});
}