export default class Visualizer {
	constructor(analyser) {
		this.analyser = analyser;
		this.draw = this.draw.bind(this);
	}

	initDraw(fftSize = Math.pow(2, 7)) {
		this.analyser.fftSize = fftSize;
		this.bufferLength = this.analyser.frequencyBinCount;
		this.dataset = new Uint8Array(this.bufferLength);

		this.padding = 20;
		this.width = Math.max(
			document.documentElement.clientWidth,
			window.innerWidth || 0
		);
		this.height = Math.max(
			document.documentElement.clientHeight,
			window.innerHeight || 0
		);

		this.height = this.height;

		this.svg = d3
			.select("body")
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height)
			.style("shape-rendering", "geometricPrecision");

		this.analyser.getByteFrequencyData(this.dataset);

		this.circles = this.svg
			.append("g")
			.selectAll("circle")
			.data(this.dataset)
			.enter()
			.append("circle");

		this.bars = this.svg
			.append("g")
			.selectAll("rect")
			.data(this.dataset)
			.enter()
			.append("rect");

		requestAnimationFrame(this.draw);
	}
	draw() {
		this.analyser.getByteFrequencyData(this.dataset);

		var xScale = d3
			.scaleBand()
			.domain(d3.range(this.dataset.length))
			.rangeRound([0, this.width])
			.paddingInner(0.5)
			.paddingOuter(0.5);

		var yScale = d3
			.scaleLinear()
			.domain([0, d3.max(this.dataset)])
			.range([this.padding, this.height - this.padding]);

		var colorScale = d3
			.scaleLinear()
			.domain([0, this.dataset.length])
			.interpolate(d3.interpolateHclLong)
			.range([d3.rgb("#FD297B"), d3.rgb("#2196f3")]);

		this.circles
			.data(this.dataset)
			.attr("cx", (d, i) => xScale(i) + xScale.bandwidth() / 2)
			.attr("cy", d => this.height - yScale(d))
			.attr("r", d => xScale.bandwidth() / 2)
			.attr("fill", (d, i) => colorScale(i));

		this.bars
			.data(this.dataset)
			.attr("x", (d, i) => xScale(i))
			.attr("y", d => this.height - yScale(d))
			.attr("width", xScale.bandwidth())
			.attr("height", d => yScale(d) - this.padding)
			.attr("fill", (d, i) => colorScale(i));

		requestAnimationFrame(this.draw);
	}
}
