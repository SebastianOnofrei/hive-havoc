import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";

export class IntroScene extends BaseScene {
  constructor() {
    super("intro");
    this.hasLocalStorageInfo = StateManager.checkLocalStorage();

    this.width = 0;
    this.height = 0;

    // We need a scaling factor for sprite responsiveness to resize event.
    this.scalingFactor = 1;
    this.droneBeePositions = {
      x: 0,
      y: 0,
    };
    this.droneBeesSwarmPositions = {
      x: 0,
      y: 0,
    };

    this.workerBeePositions = {
      x: 0,
      y: 0,
    };

    this.workerBeesSwarmPositions = {
      x: 0,
      y: 0,
    };

    this.queenBeePositions = {
      x: 0,
      y: 0,
    };

    this.buttonsSettings = {
      buttonWidth: 0,
      buttonHeight: 0,
      buttonX: 0,
      playButtonY: 0,
      settingsButtonY: 0,
    };

    // DOM Selectors
    this.honeyBg = document.getElementById("honey-bg");
    this.workerBee = document.getElementById("worker-bee");
    this.droneBee = document.getElementById("drone-bee");
    this.droneBeesSwarm = document.getElementById("drone-bees-swarm");
    this.workerBeesSwarm = document.getElementById("worker-bees-swarm");
    this.queenBee = document.getElementById("queen-bee");
  }

  // for resizing the window
  changeSpritePositions(width) {
    this.workerBeePositions.x = width * 0.1;
    this.workerBeePositions.y = 20;

    this.droneBeePositions.x = width * 0.7;
    this.droneBeePositions.y = 20;

    this.droneBeesSwarmPositions.x = width * 0.1;
    this.droneBeesSwarmPositions.y = 420;

    this.workerBeesSwarmPositions.x = width * 0.7;
    this.workerBeesSwarmPositions.y = 420;

    this.queenBeePositions.x = width * 0.45;
    this.queenBeePositions.y = 480;

    if (width > 1400) {
      this.scalingFactor = 1.4;
    } else if (width <= 1400 && width > 1200) {
      this.scalingFactor = 1.2;
    } else if (width <= 1200 && width > 1000) {
      this.scalingFactor = 1;

      this.workerBeePositions.x = width * 0.1;
      this.workerBeePositions.y = 50;

      this.droneBeePositions.x = width * 0.8;
      this.droneBeePositions.y = 50;

      this.droneBeesSwarmPositions.x = width * 0.1;
      this.droneBeesSwarmPositions.y = 420;

      this.workerBeesSwarmPositions.x = width * 0.7;
      this.workerBeesSwarmPositions.y = 420;

      this.queenBeePositions.x = width * 0.42;
      this.queenBeePositions.y = 450;
    } else if (width <= 1000) {
      this.scalingFactor = 0.9;

      this.workerBeePositions.x = width * 0.1;
      this.workerBeePositions.y = 150;

      this.droneBeePositions.x = width * 0.8;
      this.droneBeePositions.y = 150;

      this.droneBeesSwarmPositions.x = width * 0.05;
      this.droneBeesSwarmPositions.y = 420;

      this.workerBeesSwarmPositions.x = width * 0.65;
      this.workerBeesSwarmPositions.y = 420;

      this.queenBeePositions.x = width * 0.42;
      this.queenBeePositions.y = 450;
    }
  }

  draw(ctx) {
    super.draw(ctx); // Call the base class draw method to clear the canvas
    // drawing the sprites and buttons
    this.drawSprites(ctx);
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

  drawSprites(ctx) {
    // hive background
    let backgroundImage = new Image();
    backgroundImage.src = this.honeyBg.src;

    // in functie de ce width am, sa am un scaling factor si pozitii diferite.
    this.changeSpritePositions(this.width);
    ctx.drawImage(backgroundImage, 0, 0, this.width, this.height);
    ctx.drawImage(
      this.workerBee,
      this.workerBeePositions.x,
      this.workerBeePositions.y,
      160 * this.scalingFactor,
      160 * this.scalingFactor
    );
    ctx.drawImage(
      this.droneBee,
      this.droneBeePositions.x,
      this.droneBeePositions.y,
      160 * this.scalingFactor,
      160 * this.scalingFactor
    );
    ctx.drawImage(
      this.droneBeesSwarm,
      this.droneBeesSwarmPositions.x,
      this.droneBeesSwarmPositions.y,
      260 * this.scalingFactor,
      260 * this.scalingFactor
    );
    ctx.drawImage(
      this.workerBeesSwarm,
      this.workerBeesSwarmPositions.x,
      this.workerBeesSwarmPositions.y,
      260 * this.scalingFactor,
      260 * this.scalingFactor
    );
    ctx.drawImage(
      this.queenBee,
      this.queenBeePositions.x,
      this.queenBeePositions.y,
      160 * this.scalingFactor,
      160 * this.scalingFactor
    );
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
      ctx.font = "72px Segoe Script";
    } else {
      ctx.font = "60px Segoe Script";
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
    if (this.hasLocalStorageInfo) {
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
