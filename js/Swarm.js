import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";
import { Drone } from "./Drone.js";

export class Swarm {
  constructor() {
    this.queen = new Queen();
    this.workers = Array.from({ length: 5 }, () => new Worker());
    this.drones = Array.from({ length: 8 }, () => new Drone());
  }

  getAllBees() {
    return [this.queen, ...this.workers, ...this.drones];
  }

  getAliveBees() {
    return this.getAllBees().filter((bee) => !bee.isDead());
  }

  isGameOver() {
    return this.queen.isDead() || this.getAliveBees().length === 0;
  }

  hitRandomBee() {
    const aliveBees = this.getAliveBees();
    const randomBee = aliveBees[Math.floor(Math.random() * aliveBees.length)];

    const damage = this.getDamageForBee(randomBee);
    randomBee.takeDamage(damage);

    if (this.queen.isDead()) {
      this.getAllBees().forEach((bee) => bee.takeDamage(bee.health)); // All bees die if the Queen is dead
    }

    return { bee: randomBee, damage };
  }

  getDamageForBee(bee) {
    switch (bee.name) {
      case "Queen":
        return 8;
      case "Worker":
        return 10;
      case "Drone":
        return 12;
      default:
        return 0;
    }
  }
}
