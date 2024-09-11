// StateManager.test.js
import { StateManager } from "../js/core/StateManager"; // Adjust the path as needed

describe("StateManager", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset the StateManager state
    StateManager.currentState = "intro";
  });

  test('should initialize with the default state of "intro"', () => {
    expect(StateManager.getState()).toBe("intro");
  });

  test("should change the state correctly", () => {
    StateManager.changeState("main");
    expect(StateManager.getState()).toBe("main");
  });

  test("should check localStorage correctly when data exists", () => {
    localStorage.setItem("gameData", JSON.stringify({ some: "data" }));
    expect(StateManager.checkLocalStorage()).toBe(true);
  });

  test("should check localStorage correctly when data does not exist", () => {
    expect(StateManager.checkLocalStorage()).toBe(false);
  });

  test("should get game data from localStorage", () => {
    const testData = { some: "data" };
    localStorage.setItem("gameData", JSON.stringify(testData));
    expect(StateManager.getGameDataFromLocalStorage()).toEqual(testData);
  });

  test("should return null when game data does not exist in localStorage", () => {
    expect(StateManager.getGameDataFromLocalStorage()).toBeNull();
  });

  test("should remove all data from localStorage", () => {
    localStorage.setItem("gameData", JSON.stringify({ some: "data" }));
    StateManager.removeLocalStorageData();
    expect(localStorage.getItem("gameData")).toBeNull();
  });
});
