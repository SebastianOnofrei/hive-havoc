import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";

export class GameOverScene extends BaseScene {
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
    const buttonX = width * 0.125;
    const playButtonY = height * 0.25;
    const settingsButtonY = height * 0.4;

    ctx.font = "30px Arial";
    ctx.fillText("Welcome to the Game", width * 0.25, height * 0.1);

    // Draw "Play Now" button
    ctx.fillStyle = "yellow";
    ctx.fillRect(buttonX, playButtonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "black";
    ctx.fillText(
      "Play Now",
      buttonX + buttonWidth * 0.1,
      playButtonY + buttonHeight * 0.7
    );

    // Draw "Settings" button
    ctx.fillStyle = "yellow";
    ctx.fillRect(buttonX, settingsButtonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "black";
    ctx.fillText(
      "Settings",
      buttonX + buttonWidth * 0.1,
      settingsButtonY + buttonHeight * 0.7
    );
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
