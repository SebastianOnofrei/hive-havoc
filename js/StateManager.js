export const StateManager = {
  currentState: "intro",

  changeState(newState) {
    this.currentState = newState;
  },

  getState() {
    return this.currentState;
  },
};
