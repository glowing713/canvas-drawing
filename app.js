import Circle from "./circle.js";

class App {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.canvas.addEventListener("click", (e) => {
      this.drawCircleOnClick(e);
    });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  drawCircleOnClick(e) {
    const circle = new Circle(e.offsetX, e.offsetY, 50, this.ctx);
    circle.draw();
  }
}

new App();
