import { Bee } from "./Bee.js";

export class Worker extends Bee {
  constructor(health = 75, maxHealth = 75) {
    super("Worker", health, maxHealth);
  }
}
