import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../StateManager.js";

export class MainScene extends BaseScene {
  constructor() {
    super("main"); // Call the constructor of the base class
  }

  draw(ctx) {
    // Call the base class draw method to clear the canvas
    super.draw(ctx);

    /*  
      We get the canvas dimensions so that we can create coordinates
      and elements on the canvas, whose sizes are relative to the canvas sizes
      and not to the viewport - due to resizing of the browser.
    */
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const playerNameContainer = document.querySelector(
      ".player__name-container"
    );
    const playerName = document.querySelector("#player-name");
    playerNameContainer.textContent = playerName.value;
    playerNameContainer.classList.add("active");

    const hitButton = document.querySelector(".hit-button");
    hitButton.classList.add("active");

    // Define proportions for text and buttons
    const buttonWidth = width * 0.25;
    const buttonHeight = height * 0.07;
    const buttonX = width * 0.125;
    const playButtonY = height * 0.25;
    const settingsButtonY = height * 0.4;

    // individual sprites (only when one type remaining on each)
    const autumnBg = document.getElementById("autumn-bg");
    const queenBee = document.getElementById("queen-bee");

    // swarm sprites
    const droneBeesSwarm = document.getElementById("drone-bees-swarm");
    const workerBeesSwarm = document.getElementById("worker-bees-swarm");

    let backgroundImage = new Image();
    backgroundImage.src = autumnBg.src;
    // Draw new background
    ctx.drawImage(backgroundImage, 0, 0, width, height);
    ctx.drawImage(workerBeesSwarm, 100, 200, 250, 250);
    ctx.drawImage(queenBee, 300, 100, 250, 250);
    ctx.drawImage(droneBeesSwarm, 600, 200, 250, 250);
  }

  handleInput(x, y) {
    console.log("Am dat click aicisa");
    console.log(x, y);

    // Get canvas dimensions
    const canvas = document.getElementById("canvas1");

    const width = canvas.width;
    const height = canvas.height;

    // Define proportions for buttons
    const buttonWidth = width * 0.25;
    const buttonHeight = height * 0.07;
    const buttonX = width * 0.125;
    const playButtonY = height * 0.25;
    const settingsButtonY = height * 0.4;

    //  nu mai am treaba cu astea. daca apas pe enemy, sa mi se faca un div sa fie vizible si cand dau pe x sa fie invisible
    //  Ce date ma intereseaza?  vezi sticky note.
    if (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= playButtonY &&
      y <= playButtonY + buttonHeight
    ) {
      StateManager.changeState(
        localStorage.getItem("gameData") ? "resume" : "main"
      ); // Go to Resume or Main Scene
    } else if (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= settingsButtonY &&
      y <= settingsButtonY + buttonHeight
    ) {
      StateManager.changeState("settings"); // Go to Settings Scene
    }
  }
}
