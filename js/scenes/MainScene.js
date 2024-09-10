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
  }

  randomAttackSwarm() {
    console.log("YOU Attacked the swarm");
    console.log("you hit ", this.swarm.hitRandomBee());
  }

  showPlayerName() {
    const playerNameContainer = document.querySelector(
      ".player__name-container"
    );
    const playerName = document.querySelector("#player-name");
    playerNameContainer.textContent = playerName.value;
    playerNameContainer.classList.add("active");
  }

  showHitButton() {
    const hitButton = document.querySelector(".hit-button");
    hitButton.classList.add("active");
    hitButton.addEventListener("click", this.randomAttackSwarm);
  }

  showHealthBar() {
    const swarmHealthBar = document.querySelector(".health-bar");
    swarmHealthBar.classList.add("active");
  }

  changeHealthBar() {
    const lifepoints = document.querySelector(".health-bar__lifepoints");
    lifepoints.textContent = `${this.swarm.health} / ${this.swarm.maxHealth}`;
  }

  draw(ctx) {
    super.draw(ctx);
    this.showPlayerName();
    this.showHitButton();
    this.showHealthBar();
    this.changeHealthBar();
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
