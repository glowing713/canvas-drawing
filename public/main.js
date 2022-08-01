(()=>{"use strict";class t{constructor(t,i,s,e,h){this.x=t,this.y=i,this.radius=s,this.ctx=h,this.color=e}draw(){this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fillStyle=this.color,this.ctx.fill()}}new class{constructor(){this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.resize(),window.addEventListener("resize",this.resize.bind(this)),this.circles={wait:!1,coors:[],colorPick:""},this.canvas.onmousedown=this.mouseDownHandler.bind(this),this.canvas.ontouchstart=this.mouseDownHandler.bind(this),requestAnimationFrame(this.animate.bind(this))}resize(){this.stageWidth=document.body.clientWidth,this.stageHeight=document.body.clientHeight,this.ratio=window.devicePixelRatio,this.canvas.width=this.stageWidth*this.ratio,this.canvas.height=this.stageHeight*this.ratio,this.ctx.scale(this.ratio,this.ratio)}mouseDownHandler(){this.circles.colorPick=`hsl(${Math.floor(360*Math.random())}, ${25+Math.floor(70*Math.random())}%, ${85+Math.floor(10*Math.random())}%)`,this.canvas.onmousemove=this.throttleCreateCircle.bind(this),this.canvas.onmouseup=this.cleanUpHandler.bind(this),this.canvas.ontouchmove=this.throttleCreateCircle.bind(this),this.canvas.ontouchend=this.cleanUpHandler.bind(this)}cleanUpHandler(){this.canvas.onmousemove=null,this.canvas.onmouseup=null,this.canvas.ontouchmove=null,this.canvas.ontouchend=null}throttleCreateCircle(i){const[s,e]=[i.offsetX??i.touches[0].clientX,i.offsetY??i.touches[0].clientY];this.circles.wait||(setTimeout((()=>{this.circles.coors.push(new t(s,e,100,this.circles.colorPick,this.ctx)),this.circles.wait=!1}),1),this.circles.wait=!0)}animate(){this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight),this.circles.coors=this.circles.coors.reduce(((t,i)=>(i.radius>0&&(i.draw(),t.push(i)),t)),[]),this.reduceCircles(1),requestAnimationFrame(this.animate.bind(this))}reduceCircles(t){this.circles.coors.forEach((i=>{i.radius-=t}))}}})();