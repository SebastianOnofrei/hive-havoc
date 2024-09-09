// We put our JS here so we wait for all the assets to be loaded

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;

  //   images
  const workerBee = document.getElementById("worker-bee");
  const droneBee = document.getElementById("drone-bee");
  const queenBee = document.getElementById(queen.sprite);

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }

    update() {}
    draw() {}
  }

  context.drawImage(workerBee, 0, 0, 150, 150);
  context.drawImage(queenBee, 200, 0, 150, 150);
  context.drawImage(droneBee, 400, 0, 150, 150);
});
