export default class Visualizer {
  constructor(canvasCtx, analyser) {
    this.analyser = analyser;
    this.ctx = canvasCtx;
    this.WIDTH = this.ctx.canvas.width = innerWidth;
    this.HEIGHT = this.ctx.canvas.height = innerHeight;
    this.draw = this.draw.bind(this);

    this.cutSize = 6;
  }

  initDraw(fftSize = Math.pow(2, 8)) {
    this.analyser.fftSize = fftSize;
    this.bufferLength = this.analyser.frequencyBinCount - this.cutSize;
    this.dataArray = new Uint8Array(this.bufferLength);

    requestAnimationFrame(this.draw);
  }

  draw() {
    this.clearCanvas();
    this.ctx.translate(this.WIDTH / 2, this.HEIGHT / 2);
    this.analyser.getByteFrequencyData(this.dataArray);

    const maxRadius = this.WIDTH / 5 > 200 ? 200 : this.WIDTH / 5;
    const radius = Math.max(this.dataArray[3] / 255, 0.8) * maxRadius;
    this.ctx.rotate(2 * Math.PI * 0.0001); //circle rotation
    this.ctx.save();
    for (var i = this.cutSize; i < this.bufferLength; i++) {
      if (this.dataArray[i]) {
        const barWidth = radius * Math.tan((2 * Math.PI) / this.bufferLength); //DIVIDE the circle into equal segments
        const barHeight = this.dataArray[i] / 2;
        const angle = Math.atan2(barWidth, radius); //
        this.ctx.rotate(angle * 1.1);
        this.ctx.save();
        this.ctx.translate(0, radius);
        const h = (this.dataArray[i] / 255) * 359;
        const s = "75%";
        const l = `52%`;
        this.ctx.fillStyle = `hsl(${h}, ${s}, ${l})`;
        this.ctx.fillRect(-barWidth / 2, 0, barWidth, barHeight);
        this.ctx.restore();
      }
    }
    this.ctx.restore();
    this.ctx.translate(-this.WIDTH / 2, -(this.HEIGHT / 2));
    requestAnimationFrame(this.draw);
  }

  clearCanvas() {
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }
}
