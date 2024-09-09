import { Bee } from "./Bee.js";

export class Worker extends Bee {
  constructor() {
    super("Worker", 75);
  }
}
