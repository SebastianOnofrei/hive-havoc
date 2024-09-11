import { BaseScene } from "./BaseScene.js";
import { StateManager } from "../core/StateManager.js";

export class SettingsScene extends BaseScene {
  constructor() {
    super("settings");
    this.toastNotification = document.querySelector(".settings__toast-notification");
    this.saveButton = document.querySelector(".save-name__button");
    this.settingsCloseBtn = document.querySelector(".settings__close-btn");
    this.soundCheckbox = document.querySelector("#sound-checkbox");
    this.audio = document.querySelector("audio");

    this.registerEventListeners();
  }

  registerEventListeners() {
    // Handle settings close button
    this.settingsCloseBtn.addEventListener("click", this.handleClose);

    // Handle settings mute button
    this.soundCheckbox.addEventListener("click", () => {
      if (this.soundCheckbox.checked) {
        this.muteSound();
      } else {
        this.unMuteSound();
      }
    });

    this.saveButton.addEventListener("click", () => {
      this.toastNotification.classList.add("show");
      setTimeout(() => {
        this.toastNotification.classList.remove("show");
      }, 3000);
    });
  }

  muteSound() {
    this.audio.pause();
  }

  unMuteSound() {
    this.audio.play();
  }

  //closing the settings menu
  handleClose() {
    const settings = document.querySelector(".settings");
    settings.classList.remove("active");
    StateManager.changeState("intro");
  }
}
