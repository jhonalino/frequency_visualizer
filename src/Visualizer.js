export default class Visualizer {
	constructor(analyser) {
		this.analyser = analyser;
		this.draw = this.draw.bind(this);
	}

	initDraw(fftSize = Math.pow(2, 5)) {
		this.analyser.fftSize = fftSize;
		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);

		// requestAnimationFrame(this.draw);

		console.log("hell", d3);
		this.width = 500;
		this.height = 500;
		this.svg = d3
			.select("body")
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height);

		this.bars = this.svg
			.append("g")
			.selectAll("rect")
			.data(this.dataArray)
			.enter()
			.append("rect")
			.attr("x", (d, i) => i * 10)
			.attr("y", d => this.height - d)
			.attr("width", this.width / this.dataArray.length)
			.attr("height", d => d);

		requestAnimationFrame(this.draw);
	}

	draw() {
		this.analyser.getByteFrequencyData(this.dataArray);

		this.bars
			.data(this.dataArray)
			.attr("x", (d, i) => i * 10)
			.attr("y", d => this.height - d)
			.attr("width", this.width / this.dataArray.length)
			.attr("height", d => d);

		requestAnimationFrame(this.draw);
	}
}
