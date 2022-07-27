import Circle from './circle.js';
import { generateRandomColor } from './util.js';

class App {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize(); // retina display에 맞춰서 화면 비율 2배
    window.addEventListener('resize', this.resize.bind(this)); // window resize에 따라 화면 비율 유지

    this.circles = {
      wait: false,
      coors: [],
      colorPick: '',
    };
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.ontouchstart = this.mouseDownHandler.bind(this); // mobile
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
    this.circles.colorPick = generateRandomColor();
    this.canvas.onmousemove = this.throttleCreateCircle.bind(this);
    this.canvas.onmouseup = this.cleanUpHandler.bind(this);
    //mobile
    this.canvas.ontouchmove = this.throttleCreateCircle.bind(this);
    this.canvas.ontouchend = this.cleanUpHandler.bind(this);
  }

  cleanUpHandler() {
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
    //mobile
    this.canvas.ontouchmove = null;
    this.canvas.ontouchend = null;
  }

  throttleCreateCircle(e) {
    const delay = 2;
    const radius = Math.floor(300 * Math.random());
    const [weightX, weightY] = [
      Math.floor(Math.random() * 200) + 100 * Math.round(Math.random() > 0.5 ? 1 : -1),
      Math.floor(Math.random() * 200) + 100 * Math.round(Math.random() > 0.5 ? 1 : -1),
    ];
    const sideRadius = Math.floor(Math.random() * 10);
    const sidesCnt = Math.floor(Math.random() * 15);
    const [x, y] = [e.offsetX ?? e.touches[0].clientX, e.offsetY ?? e.touches[0].clientY];

    if (this.circles.wait) return;

    setTimeout(() => {
      this.circles.coors.push(new Circle(x, y, radius, this.circles.colorPick, this.ctx));
      // 주변부 원 생성
      for (let i = 0; i < sidesCnt; i++) {
        this.circles.coors.push(new Circle(x + weightX, y + weightY, sideRadius, this.circles.colorPick, this.ctx));
      }
      this.circles.wait = false;
    }, delay);

    this.circles.wait = true;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.circles.coors = this.circles.coors.reduce((acc, circle) => {
      // 원을 그리고 반지름이 0보다 작은 원은 제거
      if (circle.radius > 0) {
        circle.draw();
        acc.push(circle);
      }
      return acc;
    }, []);

    this.reduceCircles(1); // 속도에 따라 원 크기 줄이기

    requestAnimationFrame(this.animate.bind(this));
  }

  reduceCircles(speed) {
    this.circles.coors.forEach(circle => {
      circle.radius -= speed;
    });
  }
}

new App();
