import { Bee } from "./Bee.js";

export class Queen extends Bee {
  constructor(health = 100, maxHealth = 100) {
    super("Queen", health, maxHealth);
  }
}
