import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";
import { Drone } from "./Drone.js";

export class Swarm {
  // we could have a custom swarm, more than 13 bees
  constructor(workerBees = 1, droneBees = 1) {
    this.queen = new Queen();
    this.workers = Array.from({ length: workerBees }, () => new Worker());
    this.drones = Array.from({ length: droneBees }, () => new Drone());
    this.maxHealth = this.getHealth();
    this.health = this.maxHealth;
    this.status = "green";
  }

  getHealth() {
    let queenHealth = this.queen.health;
    let workersHealth = 0;
    let dronesHealth = 0;

    this.workers.map((worker) => {
      workersHealth += worker.health;
    });
    this.drones.map((drone) => {
      dronesHealth += drone.health;
    });

    let swarmHealth = queenHealth + workersHealth + dronesHealth;

    if (
      this.health < 0.8 * this.maxHealth &&
      this.health > 0.5 * this.maxHealth
    ) {
      this.setSwarmStatus("yellow");
    }

    if (
      this.health < 0.5 * this.maxHealth &&
      this.health > 0.3 * this.maxHealth
    ) {
      this.setSwarmStatus("orange");
    }

    if (this.health < 0.3 * this.maxHealth) {
      this.setSwarmStatus("red");
    }

    console.log(swarmHealth);
    return swarmHealth;
  }

  getAllBees() {
    return [this.queen, ...this.workers, ...this.drones];
  }

  getAliveBees() {
    return this.getAllBees().filter((bee) => bee.health > 0);
  }

  isGameOver() {
    return this.queen.isDead() || this.getAliveBees().length === 0;
  }

  hitRandomBee() {
    const aliveBees = this.getAliveBees();
    const randomBeeIndex = Math.floor(Math.random() * aliveBees.length);
    const randomBee = aliveBees[randomBeeIndex];

    let damage = this.getDamageForBee(randomBee);

    if (randomBee.health - damage <= 0) {
      damage = randomBee.health;
    }

    randomBee.takeDamage(damage);

    if (this.queen.health <= 0) {
      aliveBees.map((bee) => (bee.health = 0));

      localStorage.removeItem("gameData");
    }
    console.table(this);
    console.log(aliveBees);
    this.health = this.getHealth();
    return this.health;
  }

  getDamageForBee(bee) {
    switch (bee.name) {
      case "Queen":
        return 8;
      case "Worker":
        return 10;
      case "Drone":
        return 12;
    }
  }

  setSwarmStatus(status) {
    this.status = status;
  }

  getSwarmStatus() {
    return this.status;
  }
}
