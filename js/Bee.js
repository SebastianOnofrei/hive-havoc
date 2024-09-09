export class Bee {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
  }

  takeDamage(damage) {
    this.health = Math.max(0, this.health - damage);
  }

  isDead() {
    return this.health === 0;
  }
}
