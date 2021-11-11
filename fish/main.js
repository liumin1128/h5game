import "./style.css";

let x, y;
let num = 0

document.querySelector(".app").addEventListener("click", (e) => {
  const _x = x;
  const _y = y;

  num += 1

  x = e.clientX;
  y = e.clientY;

  // update fish
  const fish = document.querySelector(".fish");
  fish.style.left = x - 50 + "px";
  fish.style.top = y - 50 + "px";

  let scale = 0.5
  if(scale < 10 ) {
    scale += num * 0.1
  }

  // 计算两点距离
  let l = Math.sqrt(Math.pow((_x - x), 2) + Math.pow((_y - y), 2))
  // 计算旋转角度
  let r = Math.sin((_y - y) / l) * (180 / Math.PI)
  // 计算旋转方向
  let direction=0
  if(x > _x){
    direction=180
  }
  
  // 处理反向移动角度
  if(direction === 180) {
    r = -r
  }

  fish.style.transform = "scale("+scale+")"+ "rotateZ("+r+"deg) rotateY(" + direction + "deg)";

  // update bread
  const bread = document.createElement("div");
  bread.innerText = "🍞"
  bread.setAttribute("class", "bread");
  document.querySelector(".app").appendChild(bread);
  bread.style.left = x + "px";
  bread.style.top = y + "px";

  // 定时删除面包
  setTimeout(() => {
    document.querySelector(".app").removeChild(bread);
  }, 1000);
});
