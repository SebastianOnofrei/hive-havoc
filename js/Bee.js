export class Bee {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.status = "green";
  }

  takeDamage(damage) {
    this.health = Math.max(0, this.health - damage);
  }

  isDead() {
    return this.health === 0;
  }

  // green,yellow,orange or red - we use this for the health bar
  setHealthStatus() {
    switch (this.health) {
      case this.health > 0.8 * this.maxHealth:
        console.log("test daca e healthy");
        this.status = "green";
        break;
      case this.health < 0.8 * this.maxHealth &&
        this.health > 0.6 * this.maxHealth:
        this.status = "yellow";
        break;
      case this.health < 0.25 * this.maxHealth:
        console.log("test. daca e in 25%");
        this.status = "red";
        break;
      case this.health > 0.25 * this.maxHealth &&
        this.health <= 0.6 * this.maxHealth:
        console.log("test daca e in 50%");
        this.status = "orange";
        break;
      default:
        break;
    }
  }
}
