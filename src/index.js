import Sound from "./Sound";
import Visualizer from "./Visualizer";
import "./index.css";

import sample from "./assets/ikson-Fresh.wav";

let sound,
	visualizer,
	audioCtx,
	svgContainer,
	filePickerContainer,
	fileInput,
	chooseFileBtns,
	loader,
	info,
	playSampleBtn,
	name;

document.addEventListener("DOMContentLoaded", init);

function init() {
	svgContainer = document.querySelector(".svg-container");
	filePickerContainer = document.querySelector(".file-picker-container");
	fileInput = document.querySelector("#fileInput");
	chooseFileBtns = document.querySelectorAll(".chooseFile");
	loader = document.querySelector(".loader");
	info = document.querySelector(".info");
	name = info.querySelector(".name");
	playSampleBtn = document.querySelector("#playSample");

	fileInput.setAttribute("accept", "audio/*");

	Array.prototype.slice.call(chooseFileBtns).forEach(btn =>
		btn.addEventListener("click", _ => {
			fileInput.click();
		})
	);

	playSampleBtn.addEventListener("click", loadSample);

	fileInput.addEventListener("change", handleFileInputChange);
}

function handleFileInputChange(event) {
	const files = event.target.files;

	if (files.length > 0) {
		loader.classList.remove("hidden");
		svgContainer.classList.add("hidden");
		filePickerContainer.classList.add("hidden");
		info.classList.add("hidden");

		readAudioFile(files[0]);
	}
}

function readAudioFile(audioFile) {
	const reader = new FileReader();

	reader.onload = handleReaderLoaded;

	name.textContent = audioFile.name
		.toLowerCase()
		.substring(0, audioFile.name.indexOf("."));

	reader.readAsArrayBuffer(audioFile);
}

async function handleReaderLoaded(event) {
	const result = event.target.result;
	if (audioCtx) {
		await audioCtx.close();
		createNewAudioCtx(result);
	} else {
		createNewAudioCtx(result);
	}
}

function createNewAudioCtx(result) {
	audioCtx = new AudioContext();
	audioCtx.decodeAudioData(result, buffer => {
		sound = new Sound(audioCtx, buffer);
		sound.init();

		if (visualizer) {
			visualizer.stop();
			visualizer.setAnalyser(sound.getAnalyser());
			visualizer.setCtx(audioCtx);
			visualizer.initDraw();
		} else {
			visualizer = new Visualizer(sound.getAnalyser(), audioCtx);
		}

		loader.classList.add("hidden");
		svgContainer.classList.remove("hidden");
		info.classList.remove("hidden");

		visualizer.initDraw();
		sound.play();
	});
}

function loadSample() {
	svgContainer.classList.add("hidden");

	name.innerHTML = `<a target="_blank" href="https://www.toneden.io/ikson/post/ikson-fresh-download">Fresh by Ikson</a>`;

	loader.classList.remove("hidden");

	filePickerContainer.classList.add("hidden");
	let request = new XMLHttpRequest();
	request.open("get", sample, true);
	request.responseType = "arraybuffer";
	request.onload = () => {
		createNewAudioCtx(request.response);
	};
	request.send();
}
