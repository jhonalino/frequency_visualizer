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
		this.width = document.querySelector(".svg-container").offsetWidth;
		this.height = document.querySelector(".svg-container").offsetHeight;

		this.svg = d3
			.select(".svg-container")
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

		this.t1 = performance.now();

		this.colorRevolutionTime = 1000;
		requestAnimationFrame(this.draw);
	}
	draw() {
		this.t2 = performance.now();
		this.analyser.getByteFrequencyData(this.dataset);

		this.elapseTime = this.t2 - this.t1;

		var xScale = d3
			.scaleBand()
			.domain(d3.range(this.dataset.length))
			.rangeRound([0, this.width])
			.padding(0.4);

		var yScale = d3
			.scaleLinear()
			.domain([0, d3.max(this.dataset)])
			.range([this.padding, this.height - this.padding]);
		183;

		var colorScale = d3
			.scaleLinear()
			.domain([0, this.dataset.length])
			.interpolate(d3.interpolateHslLong)
			.range([
				d3.hsl(
					`hsl(${((this.elapseTime + (337 / 359) * this.colorRevolutionTime) /
						this.colorRevolutionTime) *
						359}, 98%, 58%)`
				),
				d3.hsl(
					`hsl(${((this.elapseTime + (183 / 359) * this.colorRevolutionTime) /
						this.colorRevolutionTime) *
						359}, 94%, 81%)`
				)
			]);

		this.circles
			.data(this.dataset)
			.attr("cx", (d, i) => xScale(i) + xScale.bandwidth() / 2)
			.attr("cy", d => yScale(d))
			.attr("r", d => xScale.bandwidth() / 2)
			.attr("fill", (d, i) => colorScale(i));

		this.bars
			.data(this.dataset)
			.attr("x", (d, i) => xScale(i))
			.attr("y", d => this.padding)
			.attr("width", xScale.bandwidth())
			.attr("height", d => yScale(d) - this.padding)
			.attr("fill", (d, i) => colorScale(i))
			.attr("stroke", (d, i) => colorScale(i))
			.attr("stroke-width", xScale.bandwidth() * 0.2);

		requestAnimationFrame(this.draw);
	}
}
