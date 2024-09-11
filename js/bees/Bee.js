export class Bee {
  constructor(name, health, maxHealth) {
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
    // aici e o buba , cu damageu
    this.health = this.health - damage;
  }

  isDead(health) {
    if (health <= 0) {
      console.error("DEAD");
    }
  }
}
