import { Bee } from "./Bee.js";

export class Drone extends Bee {
  constructor(health = 50, maxHealth = 50) {
    super("Drone", health, maxHealth);
  }
}
