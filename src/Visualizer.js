export default class Visualizer {
	constructor(analyser) {
		this.analyser = analyser;
		this.draw = this.draw.bind(this);
	}

	initDraw(fftSize = Math.pow(2, 7)) {
		this.analyser.fftSize = fftSize;
		this.analyser.smoothingTimeConstant = 0.85;
		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);

		// requestAnimationFrame(this.draw);

		this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		this.svg = d3
			.select("body")
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height);

		this.analyser.getByteFrequencyData(this.dataArray);

		this.xScale = d3
			.scaleBand()
			.domain(d3.range(this.dataArray.length))
			.rangeRound([0, this.width])
			.paddingInner(0.5);

		this.yScale = d3
			.scaleLinear()
			.domain([0, d3.max(this.dataArray)])
			.range([0, this.height]);

		this.bars = this.svg
			.append("g")
			.selectAll("rect")
			.data(this.dataArray)
			.enter()
			.append("rect")
			.attr("x", (d, i) => this.xScale(i))
			.attr("y", d => this.height - this.yScale(d))
			.attr("width", this.xScale.bandwidth())
			.attr("height", d => this.yScale(d));

		requestAnimationFrame(this.draw);
	}

	draw() {
		this.analyser.getByteFrequencyData(this.dataArray);

		this.xScale = d3
			.scaleBand()
			.domain(d3.range(this.dataArray.length))
			.rangeRound([0, this.width])
			.paddingInner(0.5);

		this.yScale = d3
			.scaleLinear()
			.domain([0, d3.max(this.dataArray)])
			.range([0, this.height]);

		this.bars
			.data(this.dataArray)
			.attr("x", (d, i) => this.xScale(i))
			.attr("y", d => this.height - this.yScale(d))
			.attr("width", this.xScale.bandwidth())
			.attr("height", d => this.yScale(d))
			.attr("fill", "hotpink");

		requestAnimationFrame(this.draw);
	}
}
