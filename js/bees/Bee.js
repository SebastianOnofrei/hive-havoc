export class Bee {
  constructor(name, health, maxHealth) {
    if (!name) {
      throw new Error("Name is required.");
    }
    if (health < 0) {
      throw new Error("Health must be a non-negative number.");
    }
    this.name = name;
    this.health = parseInt(health);
    this.maxHealth = parseInt(maxHealth);
    this.status = "green";
  }

  takeDamage(damage) {
    if (this.health <= 0) {
      this.health = 0;
      return;
    }

    this.health = this.health - damage;
  }

  isDead() {
    if (this.health <= 0) {
      return true;
    }
    return false;
  }
}
