export class BaseScene {
  constructor(name) {
    this.name = name;
  }

  draw(ctx) {
    // To be overridden by child classes
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  handleInput(x, y) {
    // To be overridden by child classes
  }
}
