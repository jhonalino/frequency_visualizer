export default class Visualizer {
  constructor(canvasCtx, analyser) {
    this.analyser = analyser;
    this.ctx = canvasCtx;
    this.WIDTH = this.ctx.canvas.width = innerWidth;
    this.HEIGHT = this.ctx.canvas.height = innerHeight;
    this.draw = this.draw.bind(this);
  }

  initDraw(ftpSize = Math.pow(2, 10)) {
    this.analyser.ftpSize = ftpSize;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    console.log(innerHeight, innerWidth);

    requestAnimationFrame(this.draw);
  }

  draw() {
    this.clearCanvas();
    this.ctx.translate(this.WIDTH / 2, this.HEIGHT / 2);
    this.analyser.getByteFrequencyData(this.dataArray);
    const radius = Math.max(this.dataArray[3] / 255, 0.8) * 200;
    this.ctx.rotate(2 * Math.PI * 0.0001);
    this.ctx.save();
    for (var i = 0; i < this.bufferLength; i++) {
      if (this.dataArray[i]) {
        const barWidth = radius * Math.tan((2 * Math.PI) / this.bufferLength); //DIVIDE the circle into equal segments
        const barHeight = this.dataArray[i] / 2;
        this.ctx.rotate(Math.atan2(barWidth, radius));
        this.ctx.save();
        this.ctx.translate(0, radius);
        this.ctx.fillStyle = `rgb(255,67,54)`;
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
