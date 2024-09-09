// We put our JS here so we wait for all the assets to be loaded before doing anything
import { IntroScene } from "./scenes/IntroScene.js";
import { MainScene } from "./scenes/MainScene.js";
import { GameOverScene } from "./scenes/GameOverScene.js";
import { ResumeScene } from "./scenes/ResumeScene.js";
import { SettingsScene } from "./scenes/SettingsScene.js";
import { StateManager } from "./StateManager.js";

window.addEventListener("load", function () {
  const audio = document.getElementById("background-music");

  // initializing canvas
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d"); //canvas rendering context
  canvas.width = 800;
  canvas.height = 600;

  // Manage global state
  let currentState = "intro"; // Initial state
  const scenes = {}; // Object to store scene instances

  // Initialize scenes
  scenes["intro"] = new IntroScene();
  scenes["main"] = new MainScene();
  scenes["gameover"] = new GameOverScene();
  scenes["resume"] = new ResumeScene();
  scenes["settings"] = new SettingsScene();

  // Handle user input
  canvas.addEventListener("click", function (event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (scenes[StateManager.getState()]) {
      scenes[StateManager.getState()].handleInput(x, y);
    }
  });

  function gameLoop() {
    if (scenes[StateManager.getState()]) {
      scenes[StateManager.getState()].draw(context);
    }

    requestAnimationFrame(gameLoop); // Continue the loop
  }

  // Start the game loop
  gameLoop();
  // audio.play();
});

// dom elements
// const hitBtn = document.querySelector(".hit-button");
// const playerName = document.querySelector(".player__name");
// // aici o sa fie Player.name
// playerName.textContent = "Player.name";

// // event listeners
// hitBtn.addEventListener("click", (e) => {
//   console.log(e);
//   console.log("Pressed button");
//   // implementare random hitting of an enemy
// });
// // Loading music
// const audio = document.getElementById("background-music");

//   // Increment index and loop back if needed - used for the background changer
//   currentIndex = (currentIndex + 1) % backgrounds.length;
// }

// // Initial call to display the first background
// changeBackground();

// // Set Interval to change background every 8 seconds
// // setInterval(changeBackground, 30000);

// // audio.play();
