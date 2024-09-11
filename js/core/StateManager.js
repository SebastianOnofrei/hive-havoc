export const StateManager = {
  currentState: "intro",

  changeState(newState) {
    this.currentState = newState;
  },

  checkLocalStorage() {
    const hasItem = localStorage.getItem("gameData");
    if (hasItem) {
      return true;
    }
    return false;
  },

  getGameDataFromLocalStorage() {
    let gameData = JSON.parse(localStorage.getItem("gameData"));
    return gameData;
  },

  removeLocalStorageData() {
    localStorage.clear();
  },

  getState() {
    return this.currentState;
  },
};
