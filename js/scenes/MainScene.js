import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";
import { Swarm } from "../bees/Swarm.js";
export class MainScene extends BaseScene {
  constructor() {
    super("main");
    // aici implementez logica
    this.swarm = new Swarm();
    console.table(this.swarm);
    console.log(this.swarm.workers);
    this.hitButton = document.querySelector(".hit-button");
    this.hitButton.addEventListener("click", () => {
      // aici bag in localStorage . ce game data pai this.swarm.
      localStorage.setItem("gameData", JSON.stringify(this.swarm));
      this.randomAttackSwarm();
    });
    this.swarmHealthBar = document.querySelector(".health-bar");
    this.playerNameContainer = document.querySelector(
      ".player__name-container"
    );
  }

  randomAttackSwarm() {
    // aici e logica in care atac.
    const swarmHealth = this.swarm.hitRandomBee();
    // ok deci aici atac. vreau sa imi dea ca raspuns hpul lor
    console.log(swarmHealth);
  }

  showPlayerName() {
    const playerName = document.querySelector("#player-name");
    this.playerNameContainer.textContent = playerName.value;
    this.playerNameContainer.classList.add("active");
  }

  showHitButton() {
    this.hitButton.classList.add("active");
  }

  showHealthBar() {
    this.swarmHealthBar.classList.add("active");
    this.changeHealthBar();
  }

  hideHealthBar() {
    this.swarmHealthBar.classList.remove("active");
  }

  hideHitButton() {
    this.hitButton.classList.remove("active");
  }

  hidePlayerName() {
    this.playerNameContainer.classList.remove("active");
  }

  changeHealthBar() {
    const lifepointsText = document.querySelector(".health-bar__lifepoints");
    const swarmHP = this.swarm.health;
    const swarmMaxHP = this.swarm.maxHealth;
    const status = this.swarm.getSwarmStatus();
    lifepointsText.textContent = `${swarmHP} / ${swarmMaxHP}`;

    if (status === "yellow") {
      this.swarmHealthBar.classList.add("yellow");
    } else if (status === "orange") {
      this.swarmHealthBar.classList.remove("yellow");
      this.swarmHealthBar.classList.add("orange");
    } else if (status === "red") {
      this.swarmHealthBar.classList.remove("orange");
      this.swarmHealthBar.classList.add("red");
    } else {
      this.swarmHealthBar.classList.remove("red");
      this.swarmHealthBar.classList.add("green");
    }
  }

  draw(ctx) {
    if (this.swarm.health <= 0) {
      this.hideHealthBar();
      this.hideHitButton();
      this.hidePlayerName();
      // recreating the swarm for future play
      this.swarm = new Swarm();
      StateManager.changeState("intro");
      return;
    }

    super.draw(ctx);
    this.showPlayerName();
    this.showHitButton();
    this.showHealthBar();

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // background of scene
    const autumnBg = document.getElementById("autumn-bg");
    let backgroundImage = new Image();
    backgroundImage.src = autumnBg.src;
    // swarm sprites
    const queenBee = document.getElementById("queen-bee");
    const droneBeesSwarm = document.getElementById("drone-bees-swarm");
    const workerBeesSwarm = document.getElementById("worker-bees-swarm");

    // Draw new background
    ctx.drawImage(backgroundImage, 0, 0, width, height);
    ctx.drawImage(workerBeesSwarm, 100, 400, 250, 250);
    ctx.drawImage(queenBee, 300, 300, 250, 250);
    ctx.drawImage(droneBeesSwarm, 500, 400, 250, 250);
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
