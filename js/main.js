// We put our JS here so we wait for all the assets to be loaded before doing anything

window.addEventListener("load", function () {
  // initializing canvas
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");
  canvas.width = 1440;
  canvas.height = 1080;

  // dom elements
  const hitBtn = document.querySelector(".hit-button");

  hitBtn.addEventListener("click", (e) => {
    console.log(e);
    console.log("Pressed button");
  });
  // Loading music
  const audio = document.getElementById("background-music");

  // loading backgrounds
  const autumnBg = document.getElementById("autumn-bg");
  const springBg = document.getElementById("spring-bg");
  const summerBg = document.getElementById("summer-bg");
  const winterBg = document.getElementById("winter-bg");

  const backgrounds = [autumnBg, springBg, summerBg, winterBg];
  let currentIndex = 0;
  let backgroundImage = new Image();

  // individual sprites (only when one type remaining on each)
  const workerBee = document.getElementById("worker-bee");
  const droneBee = document.getElementById("drone-bee");
  const queenBee = document.getElementById("queen-bee");

  // swarm sprites
  const droneBeesSwarm = document.getElementById("drone-bees-swarm");
  const workerBeesSwarm = document.getElementById("worker-bees-swarm");

  function changeBackground() {
    backgroundImage.src = backgrounds[currentIndex].src;
    backgroundImage.onload = function () {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Draw new background

      context.drawImage(workerBeesSwarm, 340, 400, 350, 350);
      context.drawImage(queenBee, 600, 200, 350, 350);

      context.drawImage(droneBeesSwarm, 800, 400, 350, 350);
    };

    currentIndex = (currentIndex + 1) % backgrounds.length; // Increment index and loop back if needed
  }

  // Initial call to display the first background
  changeBackground();

  // Set Interval to change background every 8 seconds
  // setInterval(changeBackground, 30000);
  // class Game {
  //   constructor(width, height) {
  //     this.width = width;
  //     this.height = height;
  //   }

  //   update() {}
  //   draw() {}
  // }
  // audio.play();
});
