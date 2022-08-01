export default class Circle {
  constructor(x, y, radius, color, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
