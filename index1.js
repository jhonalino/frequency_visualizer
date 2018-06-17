document.addEventListener("DOMContentLoaded", () => {
  init();
});
let ctx;
function init() {
  ctx = document.getElementById("canvas").getContext("2d");

  window.requestAnimationFrame(draw);
}
arr = [...Array(60)].map((_, i) => i);

function draw() {
  ctx.clearRect(0, 0, 500, 500);
  for (var i = 0; i < arr.length; i++) {
    ctx.translate(250, 250);
    ctx.rotate(10 * (Math.PI / 180));
    ctx.strokeRect(60, 0, maxRand(100), 10);
    ctx.translate(-250, -250);
  }

  window.requestAnimationFrame(draw);
}

function maxRand(max) {
  return Math.floor(Math.random() * max);
}
