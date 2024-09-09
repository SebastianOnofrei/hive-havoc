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

    // Define proportions for text and buttons
    const buttonWidth = width * 0.25;
    const buttonHeight = height * 0.07;
    const buttonX = width * 0.125;
    const playButtonY = height * 0.25;
    const settingsButtonY = height * 0.4;

    // individual sprites (only when one type remaining on each)
    const autumnBg = document.getElementById("autumn-bg");
    const workerBee = document.getElementById("worker-bee");
    const droneBee = document.getElementById("drone-bee");
    const queenBee = document.getElementById("queen-bee");

    // swarm sprites
    const droneBeesSwarm = document.getElementById("drone-bees-swarm");
    const workerBeesSwarm = document.getElementById("worker-bees-swarm");

    let backgroundImage = new Image();
    backgroundImage.src = autumnBg.src;
    // Draw new background
    ctx.drawImage(backgroundImage, 0, 0, width, height);
    ctx.drawImage(workerBeesSwarm, 200, 200, 150, 150);
    ctx.drawImage(queenBee, 300, 100, 150, 150);
    ctx.drawImage(droneBeesSwarm, 400, 200, 150, 150);

    // ctx.font = "30px Arial";
    // ctx.fillText("Main Screen", width * 0.25, height * 0.1);

    // // Draw "Play Now" button
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(buttonX, playButtonY, buttonWidth, buttonHeight);
    // ctx.fillStyle = "black";
    // ctx.fillText(
    //   "Play Now",
    //   buttonX + buttonWidth * 0.1,
    //   playButtonY + buttonHeight * 0.7
    // );

    // // Draw "Settings" button
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(buttonX, settingsButtonY, buttonWidth, buttonHeight);
    // ctx.fillStyle = "black";
    // ctx.fillText(
    //   "Settings",
    //   buttonX + buttonWidth * 0.1,
    //   settingsButtonY + buttonHeight * 0.7
    // );
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
