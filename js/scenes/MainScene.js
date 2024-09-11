import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";
import { Swarm } from "../bees/Swarm.js";

export class MainScene extends BaseScene {
  constructor() {
    super("main");

    this.swarm = new Swarm();
    if (StateManager.checkLocalStorage()) {
      let gameData = JSON.parse(localStorage.getItem("gameData"));
      this.swarm.setSwarmQueen(gameData.queen);
      this.swarm.setSwarmWorkers(gameData.workers);
      this.swarm.setSwarmDrones(gameData.drones);
    }

    // DOM selectors for the UI elements
    this.swarmHealthBar = document.querySelector(".health-bar");
    this.playerNameContainer = document.querySelector(".player__name-container");
    this.damageNotificationContainer = document.querySelector(".toast-notification");
    this.battleInfoButton = document.querySelector(".battle__details-button");
    this.hitButton = document.querySelector(".hit-button");
    this.battleInformationModal = document.querySelector(".battle__information");

    this.queenInfoContainer = document.querySelector(".queen-info");
    this.workersInfoContainer = document.querySelector(".workers-info");
    this.dronesInfoContainer = document.querySelector(".drones-info");
    // event listeners

    this.hitButton.addEventListener("click", () => {
      // aici bag in localStorage . ce game data pai this.swarm.
      localStorage.setItem("gameData", JSON.stringify(this.swarm));
      this.randomAttackSwarm();
    });
    this.battleInfoButton.addEventListener("click", () => {
      // aici deschidem divul cu detalii.
      this.showBattleInfo();
    });
  }

  randomAttackSwarm() {
    const swarm = this.swarm.hitRandomBee();
    const { swarmHealth, damagedBee, damageDone, swarmInfoByType } = swarm;
    this.swarmHealthBar.classList.add("tremble");
    console.log(swarmHealth);
    console.table(swarmInfoByType);
    // de aici tre sa imi iau damaged bee. din hitRandom Bee. hitRandomBee sa imi dea un obiect cu astea chestii. ce randomBee, swarm health
    this.showDamage(damagedBee, damageDone);
    setTimeout(() => {
      this.swarmHealthBar.classList.remove("tremble");
    }, 1500);
  }

  // functie de adaugare in battle details
  updateBattleDetails() {
    // queen bee
    const queenInfo = this.swarm.queen;
    this.queenInfoContainer.innerHTML = `${queenInfo.name} :  ${queenInfo.health} / <span style="color:greenyellow"> ${queenInfo.maxHealth} HP</span>`;

    // worker bees.
    const workerBeesInfo = this.swarm.workers;
    let workerBessTemplate = ``;
    workerBeesInfo.map((bee) => {
      workerBessTemplate += `<div class="bee-info">${bee.name} :  ${bee.health} / <span style="color:greenyellow"> ${bee.maxHealth} HP </span></div>`;
    });
    this.workersInfoContainer.innerHTML = workerBessTemplate;

    // drone bees.
    const droneBeesInfo = this.swarm.drones;
    let droneBessTemplate = ``;
    droneBeesInfo.map((bee) => {
      droneBessTemplate += `<div class="bee-info">${bee.name} :  ${bee.health} / <span style="color:greenyellow"> ${bee.maxHealth} HP </span></div>`;
    });
    this.dronesInfoContainer.innerHTML = droneBessTemplate;
  }

  showDamage(damagedBee, damage) {
    console.log(damagedBee);
    this.damageNotificationContainer.innerHTML = `You have attacked a <span style="color:orange"> ${damagedBee.name} bee </span> with <span style="color:orange"> ${damage} </span> points.`;
    this.damageNotificationContainer.classList.add("show");

    setTimeout(() => {
      this.hideDamageNotification();
    }, 2500);
  }

  hideDamageNotification() {
    this.damageNotificationContainer.classList.remove("show");
  }

  showPlayerName() {
    const playerName = document.querySelector("#player-name");
    this.playerNameContainer.textContent = playerName.value;
    this.playerNameContainer.classList.add("active");
  }

  showBattleInfoButton() {
    this.battleInfoButton.classList.add("active");
  }

  showHitButton() {
    this.hitButton.classList.add("active");
  }

  showHealthBar() {
    this.swarmHealthBar.classList.add("active");
    this.changeHealthBar();
  }

  showBattleInfo() {
    this.battleInformationModal.classList.toggle("active");
  }

  hideBattleInfo() {
    this.battleInformationModal.classList.remove("active");
  }

  hideHealthBar() {
    this.swarmHealthBar.classList.remove("active");
  }

  hideHitButton() {
    this.hitButton.classList.remove("active");
  }

  hideBattleInfoButton() {
    this.battleInfoButton.classList.remove("active");
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
    this.updateBattleDetails();

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

  hideUiElements() {
    this.hideHealthBar();
    this.hideHitButton();
    this.hidePlayerName();
    this.hideBattleInfoButton();
    this.hideBattleInfo();
    this.hideDamageNotification();
  }

  showUiElements() {
    this.showPlayerName();
    this.showHitButton();
    this.showHealthBar();
    this.showBattleInfoButton();
  }

  draw(ctx) {
    if (this.swarm.health <= 0) {
      this.hideUiElements();
      // recreating the swarm for future play
      StateManager.removeLocalStorageData();
      this.swarm = new Swarm();
      StateManager.changeState("intro");
      return;
    }

    super.draw(ctx);

    this.showUiElements();

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // aici sa pozitionez spritesurile in functie de width

    // background of scene
    const autumnBg = document.getElementById("autumn-bg");
    let backgroundImage = new Image();
    backgroundImage.src = autumnBg.src;
    // Draw new background
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    this.drawSprites(ctx, width);
  }

  drawSprites(ctx, width) {
    // swarm sprites
    const queenBee = document.getElementById("queen-bee");
    const droneBeesSwarm = document.getElementById("drone-bees-swarm");
    const workerBeesSwarm = document.getElementById("worker-bees-swarm");
    if (width >= 1600) {
      ctx.drawImage(workerBeesSwarm, 1100, 280, 350, 350);
      ctx.drawImage(queenBee, 800, 200, 350, 350);
      ctx.drawImage(droneBeesSwarm, 600, 300, 300, 300);
    } else if (width <= 1000 && width > 800) {
      ctx.drawImage(workerBeesSwarm, 400, 380, 350, 350);
      ctx.drawImage(queenBee, 200, 300, 350, 350);
      ctx.drawImage(droneBeesSwarm, 80, 450, 300, 300);
    } else if (width <= 800 && width > 600) {
      ctx.drawImage(workerBeesSwarm, 400, 380, 250, 250);
      ctx.drawImage(queenBee, 200, 300, 250, 250);
      ctx.drawImage(droneBeesSwarm, 80, 450, 200, 200);
    } else if (width <= 600 && width > 550) {
      ctx.drawImage(workerBeesSwarm, 300, 380, 250, 250);
      ctx.drawImage(queenBee, 200, 200, 250, 250);
      ctx.drawImage(droneBeesSwarm, 80, 350, 200, 200);
    } else if (width <= 550) {
      ctx.drawImage(workerBeesSwarm, 160, 300, 150, 150);
      ctx.drawImage(queenBee, 100, 200, 150, 150);
      ctx.drawImage(droneBeesSwarm, 30, 300, 100, 100);
    } else {
      ctx.drawImage(workerBeesSwarm, 500, 380, 350, 350);
      ctx.drawImage(queenBee, 300, 300, 350, 350);
      ctx.drawImage(droneBeesSwarm, 180, 450, 300, 300);
    }
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
      StateManager.changeState(localStorage.getItem("gameData") ? "resume" : "main"); // Go to Resume or Main Scene
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
