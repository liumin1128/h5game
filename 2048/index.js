import "normalize.css";
import "animate.css";
import "./index.css";

const WIDTH = 4;
const HEIGHT = 4;

for (let i = 0; i < 16; i++) {
  let box = document.createElement("div");
  box.setAttribute("class", "box");
  document.querySelector(".bg").appendChild(box);
}

let data = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];


// 生成css
// for (let i = 0; i < data.length; i++) {
//   for (let j = 0; j < data[i].length; j++) {
//     // let box = document.createElement("div");
//     // box.setAttribute("class", "box box_" + (i + "_" + j));
//       .box_${i}_${j} {
//         left: ${i * 200 + 5 + "px"};
//         top: ${j * 200 + 5 + "px"};
//       }
//     `)
//   }
// }


// 初始化
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === 0) {
      continue;
    }
    let box = document.createElement("div");
    box.setAttribute("class", "box box_value_"+ data[i][j] +" box_" + (j + "_" + i));
    // box.style.left = i * 200 + 5 + "px";
    // box.style.top = j * 200 + 5 + "px";
    box.innerText = data[i][j];
    document.querySelector(".actor").appendChild(box);
  }
}

// 生成第一个方块
newBox()

// 映射坐标，抹除方向上的异常
function getCurrentBox(d, i, j) {
  if (d === 0) {
    return [j, i]
  } else if (d === 1) {
    return [i, 3 - j]
  } else if (d === 2) {
    return [3 - j,i]
  } else if (d === 3) {
    return [i, j]
  }
}

const sleep  =(t) => new Promise((resolve, reject) => {setTimeout(resolve, t)})

// 随机生成一个方块
async function newBox() {
  const list = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(data[i][j] === 0) {
        list.push([i, j])
      }
    }
  }
  if(list.length === 0) {
    alert("failed")
  } else {
    let index = Math.floor(Math.random() * list.length, 0)

    const [x,y] = list[index] 

    const value = Math.random() > 0.5 ? 4 : 2

    data[x][y] = value
    let box = document.createElement("div");
    box.setAttribute("class", "box animated bounceIn box_value_"+ value +" box_" + (y + "_" + x));
    box.innerText = value
    document.querySelector(".actor").appendChild(box);

    // setTimeout(() => {
    //   box.setAttribute("class", "box bounceIn box_value_"+ value +" box_" + (y + "_" + x));
    // },10)


  }
}

let lock = false

async function move(d) {

  if(lock) {
    return
  }

  lock = true

  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {

      async function compare () {
      
        const [x, y] = getCurrentBox(d, i, j);
        const dj = data[x][y]


        // 如果当前方块为0，适用移动方案
        if (dj === 0) {
          for (let k = j + 1; k < HEIGHT; k++) {
            const [_x, _y] = getCurrentBox(d, i, k);
            const dk = data[_x][_y]

            if (dk !== 0) {

              const obj = document.querySelector(".box_" + _y + "_" + _x);
              obj.setAttribute("class", "box  box_value_"+ dk +" box_" + (y + "_" + x));
              
              data[x][y] = data[_x][_y];
              data[_x][_y] = 0

              // 递归调用
              compare()

              break;
            }
          }
        }

        // 如果当前方块不为0，适用比较方案
        if (dj !== 0) {
          for (let k = j + 1; k < HEIGHT; k++) {
            const [_x, _y] = getCurrentBox(d, i, k);
            const dk = data[_x][_y]

            if (dk === 0) {
              continue
            }

            if(dk !== dj) {
                break;
            }

            const obj = document.querySelector(".box_" + y + "_" + x);
            const obk = document.querySelector(".box_" + _y + "_" + _x);
            
            obk.setAttribute("class", "box  box_value_"+ dk +" remove box_" + (y + "_" + x));
            
            setTimeout(() => {
              obk.remove()
            }, 100)

            data[x][y] += data[_x][_y];
            data[_x][_y] = 0

            obj.innerText = data[x][y]
            obj.setAttribute("class", "box rubberBand animated once box_value_"+ data[x][y] +" box_" + (y + "_" + x));

            break;
          }
        }
      }

      compare()
    }
  }

  await newBox()

  setTimeout(() => {
    lock = false
  }, 300)

  // console.log(data)
}

document.querySelector(".up").addEventListener("click", function () {
  move(0)
})

document.querySelector(".right").addEventListener("click", function () {
  move(1)
})

document.querySelector(".down").addEventListener("click", function () {
  move(2)
})

document.querySelector(".left").addEventListener("click", function () {
  move(3)
})

// 映射键盘按键
document.body.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 38: {
      move(0)
      break;
    }

    case 39: {
      move(1)
      break;
    }

    case 40: {
      move(2)
      break;
    }

    case 37: {
      move(3)
      break;
    }
    
  }
 });