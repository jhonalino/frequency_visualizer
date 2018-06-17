export default class Sound {
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }

  init() {
    const { context } = this;
    this.source = context.createBufferSource();
    this.source.buffer = this.buffer;

    this.gain = context.createGain();
    this.analyser = context.createAnalyser();

    this.source.connect(this.analyser);
    this.analyser.connect(this.gain);
    this.gain.connect(context.destination);
  }

  getAnalyser() {
    return this.analyser;
  }

  play() {
    this.init();
    this.source.start();
  }

  stop(time = 0) {
    this.source.stop(time);
  }
}
