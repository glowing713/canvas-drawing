import Circle from "./circle.js";

class App {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.resize(); // retina display에 맞춰서 화면 비율 2배
    window.addEventListener("resize", this.resize.bind(this)); // window resize에 따라 화면 비율 유지

    this.circles = {
      wait: false,
      coors: [],
    };
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.ratio = window.devicePixelRatio;

    this.canvas.width = this.stageWidth * this.ratio;
    this.canvas.height = this.stageHeight * this.ratio;
    this.ctx.scale(this.ratio, this.ratio);
  }

  mouseDownHandler() {
    this.canvas.onmousemove = this.throttleCreateCircle.bind(this);
    this.canvas.onmouseup = this.cleanUpHandler.bind(this);
  }

  cleanUpHandler() {
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }

  throttleCreateCircle(e) {
    const delay = 15;

    if (this.circles.wait) return;

    setTimeout(() => {
      this.circles.coors.push(new Circle(e.offsetX, e.offsetY, 100, this.ctx));
      this.circles.wait = false;
    }, delay);

    this.circles.wait = true;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.circles.coors.forEach((circle) => {
      // 사용자가 추가한 원 그리기
      circle.draw();
    });
    this.reduceCircles(1); // 속도에 따라 원 크기 줄이기
    this.circles.coors = this.circles.coors.filter((circle) => {
      // 반지름이 0인 원 제거
      return circle.radius > 0;
    });
    requestAnimationFrame(this.animate.bind(this));
  }

  reduceCircles(speed) {
    this.circles.coors.forEach((circle) => {
      circle.radius -= speed;
    });
  }
}

new App();
