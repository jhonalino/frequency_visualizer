export default class Sound {
	constructor(context, buffer) {
		this.context = context;
		this.buffer = buffer;
	}

	init() {
		const { context } = this;
		this.source = context.createBufferSource();
		this.source.buffer = this.buffer;
		this.source.loop = true;

		this.analyser = context.createAnalyser();

		this.source.connect(this.analyser);
		this.analyser.connect(context.destination);
	}

	getAnalyser() {
		return this.analyser;
	}

	play(time) {
		this.source.start(0, time);
	}
}
