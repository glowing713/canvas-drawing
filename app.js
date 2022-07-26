import Circle from "./circle.js";

class App {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.resize(); // retina display에 맞춰서 화면 비율 2배
    window.addEventListener("resize", this.resize.bind(this)); // window resize에 따라 화면 비율 유지

    this.throttleObj = {
      wait: false,
      offsetX: 0,
      offsetY: 0,
    };
    this.canvas.addEventListener("mousemove", (e) => {
      // 커서 위치를 저장
      this.throttleObj.offsetX = e.offsetX;
      this.throttleObj.offsetY = e.offsetY;
      // mousemove에 따라 화면에 원을 그리는 쓰로틀링 함수를 실행
      this.throttleDraw(10);
    });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  throttleDraw(delay = 100) {
    if (this.throttleObj.wait) return;

    setTimeout(() => {
      // delay 후에 현재 커서 위치에 원을 그림
      const { offsetX, offsetY } = this.throttleObj;
      const circle = new Circle(offsetX, offsetY, 50, this.ctx);
      circle.draw();
      this.throttleObj.wait = false;
    }, delay);

    this.throttleObj.wait = true;
  }
}

new App();
