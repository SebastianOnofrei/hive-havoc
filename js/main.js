// We put our JS here so we wait for all the assets to be loaded before doing anything
import { IntroScene } from "./scenes/IntroScene.js";
import { MainScene } from "./scenes/MainScene.js";
import { GameOverScene } from "./scenes/GameOverScene.js";
import { ResumeScene } from "./scenes/ResumeScene.js";
import { SettingsScene } from "./scenes/SettingsScene.js";
import { StateManager } from "./core/StateManager.js";

window.addEventListener("load", function () {
  // initializing canvas
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d"); //canvas rendering context
  const audio = document.querySelector("audio");
  const scenes = {}; // Object to store scene instances

  audio.play();
  initializeCanvas();
  initializeScenes();
  registerEventListeners();
  // Start the game loop
  gameLoop();

  function initializeCanvas() {
    resizeCanvas(); // Set initial size
    window.addEventListener("resize", resizeCanvas);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Initialize scenes
  function initializeScenes() {
    scenes["intro"] = new IntroScene();
    scenes["main"] = new MainScene();
    scenes["gameover"] = new GameOverScene();
    scenes["resume"] = new ResumeScene();
    scenes["settings"] = new SettingsScene();
  }

  function registerEventListeners() {
    // Handle user input on the canvas
    canvas.addEventListener("click", handleCanvasClick);

    // Listen for fullscreen and resize changes
    document.addEventListener("fullscreenchange", resizeCanvas);
    document.addEventListener("webkitfullscreenchange", resizeCanvas);
    document.addEventListener("mozfullscreenchange", resizeCanvas);
    document.addEventListener("MSFullscreenChange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
  }

  function handleCanvasClick(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const currentScene = scenes[StateManager.getState()];
    if (currentScene) {
      currentScene.handleInput(x, y);
    }
  }

  function muteSound() {
    audio.pause();
  }

  function unMuteSound() {
    audio.play();
  }

  function gameLoop() {
    if (scenes[StateManager.getState()]) {
      scenes[StateManager.getState()].draw(context);
    }
    requestAnimationFrame(gameLoop); // Continue the loop
  }
});
