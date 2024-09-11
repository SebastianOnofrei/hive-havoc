import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";

export class IntroScene extends BaseScene {
  constructor() {
    super("intro"); // Call the constructor of the base class
  }

  draw(ctx) {
    super.draw(ctx); // Call the base class draw method to clear the canvas

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
    const buttonX = width * 0.38;
    const playButtonY = height * 0.3;
    const settingsButtonY = height * 0.4;

    // hive bg
    const honeyBg = document.getElementById("honey-bg");
    const workerBee = document.getElementById("worker-bee");
    const droneBee = document.getElementById("drone-bee");
    const droneBeesSwarm = document.getElementById("drone-bees-swarm");
    const workerBeesSwarm = document.getElementById("worker-bees-swarm");

    let backgroundImage = new Image();
    backgroundImage.src = honeyBg.src;
    ctx.drawImage(backgroundImage, 0, 0, width, height);
    ctx.drawImage(workerBee, width * 0.05, 20, 160, 160);
    ctx.drawImage(droneBee, width * 0.8, 20, 160, 160);
    ctx.drawImage(droneBeesSwarm, width * 0.15, height * 0.6, 260, 260);
    ctx.drawImage(workerBeesSwarm, width * 0.58, height * 0.6, 260, 260);

    ctx.font = "60px Segoe Script";
    ctx.fillStyle = "black";
    ctx.fillText("HIVE KOMBAT", width * 0.3, height * 0.15);

    ctx.font = "42px Gabriola";
    // Draw "Play Now" button
    ctx.fillStyle = "orangered";
    ctx.fillRect(buttonX, playButtonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Play", buttonX + buttonWidth * 0.1, playButtonY + buttonHeight * 0.7);

    // Draw "Settings" button
    ctx.fillStyle = "orangered";
    ctx.fillRect(buttonX, settingsButtonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Settings", buttonX + buttonWidth * 0.1, settingsButtonY + buttonHeight * 0.7);
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
    const buttonX = width * 0.38;
    const playButtonY = height * 0.3;
    const settingsButtonY = height * 0.4;

    if (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= playButtonY &&
      y <= playButtonY + buttonHeight
    ) {
      StateManager.changeState(localStorage.getItem("gameData") ? "resume" : "main"); // Go to Resume or Main Scene
    } else if (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= settingsButtonY &&
      y <= settingsButtonY + buttonHeight
    ) {
      const settings = document.querySelector(".settings");
      settings.classList.add("active");
      StateManager.changeState("settings"); // Go to Settings Scene
    }
  }
}
