import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";

export class GameOverScene extends BaseScene {
  constructor() {
    super("intro");
    this.countdown = 5; // Initialize the countdown
    this.countdownInterval = null; // To keep track of the countdown interval
    this.honeyBg = document.getElementById("honey-bg");
    this.width = 0;
    this.height = 0;
  }

  // Method to start the countdown
  startCountdown() {
    this.countdown = 5;
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        this.updateCountdownDisplay();
      } else {
        clearInterval(this.countdownInterval);
        this.countdown = 5;
        this.countdownInterval = null;
        StateManager.changeState("intro"); // Redirect to the main menu
      }
    }, 1000); // Update every second
  }

  // Method to update countdown display
  updateCountdownDisplay() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let backgroundImage = new Image();
    backgroundImage.src = this.honeyBg.src;
    ctx.drawImage(backgroundImage, 0, 0, this.width, this.height);
    // Draw the game over message
    ctx.font = "40px Gabriola";
    ctx.fillStyle = "white";
    ctx.fillText("YOU WON. GAME OVER.", width * 0.35, height * 0.3);

    // Draw countdown message
    ctx.font = "30px Gabriola";
    ctx.fillStyle = "white";
    ctx.fillText(`Returning to main menu in ${this.countdown}...`, width * 0.35, height * 0.5);
  }

  draw(ctx) {
    super.draw(ctx);
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    if (this.countdownInterval === null) {
      this.startCountdown(); // Start the countdown if it's not already running
    }

    this.updateCountdownDisplay(); // Update the display with the countdown message
  }
}
