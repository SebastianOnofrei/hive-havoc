// swarm.test.js
import { Swarm } from "../js/bees/Swarm.js";

describe("Swarm Class", () => {
  test("should create a swarm with a queen, workers, and drones", () => {
    const swarm = new Swarm();
    expect(swarm.queen).toBeDefined();
    expect(swarm.workers.length).toBe(5); // Default 5 workers
    expect(swarm.drones.length).toBe(8); // Default 8 drones
  });

  test("should calculate swarm health correctly", () => {
    const swarm = new Swarm();
    const initialHealth = swarm.getHealth();
    expect(swarm.health).toBe(initialHealth);
    expect(swarm.maxHealth).toBe(initialHealth);
  });

  test("should return all bees in the swarm", () => {
    const swarm = new Swarm();
    const allBees = swarm.getAllBees();
    expect(allBees.length).toBe(14); // 1 Queen + 5 Workers + 8 Drones
  });

  test("should filter alive bees correctly", () => {
    const swarm = new Swarm();
    swarm.workers[0].health = 0; // One worker is dead
    const aliveBees = swarm.getAliveBees();
    expect(aliveBees.length).toBe(13); // 1 Queen + 4 Workers + 8 Drones
  });

  test("should change swarm status when health changes", () => {
    const swarm = new Swarm();
    swarm.health = 0.4 * swarm.maxHealth; // Set health to 40%
    swarm.getHealth(); // Trigger status update
    expect(swarm.getSwarmStatus()).toBe("orange");
  });

  test("should correctly identify game over when queen is dead", () => {
    const swarm = new Swarm();
    swarm.queen.health = 0; // Queen is dead
    expect(swarm.isGameOver()).toBe(true);
  });
});
