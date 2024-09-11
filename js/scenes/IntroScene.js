import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";

export class IntroScene extends BaseScene {
  constructor() {
    super("intro");
    this.hasLocalStorageInfo = StateManager.checkLocalStorage();

    this.width = 0;
    this.height = 0;
    this.buttonsSettings = {
      buttonWidth: 0,
      buttonHeight: 0,
      buttonX: 0,
      playButtonY: 0,
      settingsButtonY: 0,
    };

    this.honeyBg = document.getElementById("honey-bg");
  }

  draw(ctx) {
    super.draw(ctx); // Call the base class draw method to clear the canvas
    this.drawBg(ctx);
    this.drawButtons(ctx);
  }

  handleInput(x, y) {
    if (
      x >= this.buttonsSettings.buttonX &&
      x <= this.buttonsSettings.buttonX + this.buttonsSettings.buttonWidth &&
      y >= this.buttonsSettings.playButtonY &&
      y <= this.buttonsSettings.playButtonY + this.buttonsSettings.buttonHeight
    ) {
      StateManager.changeState("main");
    } else if (
      x >= this.buttonsSettings.buttonX &&
      x <= this.buttonsSettings.buttonX + this.buttonsSettings.buttonWidth &&
      y >= this.buttonsSettings.settingsButtonY &&
      y <= this.buttonsSettings.settingsButtonY + this.buttonsSettings.buttonHeight
    ) {
      const settings = document.querySelector(".settings");
      settings.classList.add("active");
      StateManager.changeState("settings"); // Go to Settings Scene
    }
  }

  drawBg(ctx) {
    // hive background
    let backgroundImage = new Image();
    backgroundImage.src = this.honeyBg.src;
    ctx.drawImage(backgroundImage, 0, 0, this.width, this.height);
  }

  drawButtons(ctx) {
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    // Define proportions for text and buttons
    this.buttonsSettings.buttonHeight = this.height * 0.07;
    this.buttonsSettings.buttonX = this.width * 0.38;
    this.buttonsSettings.playButtonY = this.height * 0.3;
    this.buttonsSettings.settingsButtonY = this.height * 0.4;

    if (this.width > 1400) {
      this.buttonsSettings.buttonWidth = this.width * 0.15;
    } else {
      this.buttonsSettings.buttonWidth = this.width * 0.25;
    }

    let rectangleOptions = {
      btnX: this.buttonsSettings.buttonX,
      btnWidth: this.buttonsSettings.buttonWidth,
      btnHeight: this.buttonsSettings.buttonHeight,
    };

    if (this.width > 1400) {
      ctx.font = "84px Segoe Script";
    } else if (this.width <= 1000 && this.width > 700) {
      ctx.font = "52px Segoe Script";
    } else if (this.width < 700) {
      ctx.font = "48px Segoe Script";
    } else {
      ctx.font = "64px Segoe Script";
    }

    ctx.fillStyle = "black";
    ctx.fillText("HIVE KOMBAT", this.width * 0.32, this.height * 0.15);
    ctx.font = "42px Gabriola";

    // Draw "Play Now" button
    ctx.fillStyle = "orangered";
    ctx.fillRect(
      rectangleOptions.btnX,
      this.buttonsSettings.playButtonY,
      rectangleOptions.btnWidth,
      rectangleOptions.btnHeight
    );

    ctx.fillStyle = "white";
    let text;
    if (localStorage.getItem("gameData")) {
      text = "Resume";
    } else {
      text = "Play new";
    }

    ctx.fillText(
      text,
      rectangleOptions.btnX + rectangleOptions.btnWidth * 0.1,
      this.buttonsSettings.playButtonY + rectangleOptions.btnHeight * 0.7
    );

    // Draw "Settings" button
    ctx.fillStyle = "orangered";
    ctx.fillRect(
      rectangleOptions.btnX,
      this.buttonsSettings.settingsButtonY,
      rectangleOptions.btnWidth,
      rectangleOptions.btnHeight
    );
    ctx.fillStyle = "white";
    ctx.fillText(
      "Settings",
      rectangleOptions.btnX + rectangleOptions.btnWidth * 0.1,
      this.buttonsSettings.settingsButtonY + rectangleOptions.btnHeight * 0.7
    );
  }
}
