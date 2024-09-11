import { Bee } from "../js/bees/Bee.js";

describe("Bee Class", () => {
  test("should create a bee instance with the correct name and health", () => {
    const bee = new Bee("Worker", 100);
    expect(bee.name).toBe("Worker");
    expect(bee.health).toBe(100);
  });

  test("should throw an error if name is not provided", () => {
    expect(() => new Bee()).toThrow("Name is required.");
  });

  test("should throw an error if health is negative", () => {
    expect(() => new Bee("Queen", -10)).toThrow("Health must be a non-negative number.");
  });

  test("should return true for isDead if health is 0", () => {
    const bee = new Bee("Worker", 0);
    expect(bee.isDead()).toBe(true);
  });

  test("should return false for isDead if health is above 0", () => {
    const bee = new Bee("Drone", 1);
    expect(bee.isDead()).toBe(false);
  });
});
