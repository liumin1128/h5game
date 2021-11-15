import "normalize.css";
import "animate.css";
import "./position.css";
import "./value.css";
import "./index.css";

const WIDTH = 4;
const HEIGHT = 4;

const sleep = (t) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });

let data = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function renderBg() {
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < WIDTH; j++) {
      let box = document.createElement("div");
      box.setAttribute("class", "box bg box_" + i + "_" + j);
      // box.style.left = `${i * (23.75 + 1) + 1 + "%"}`;
      // box.style.top = `${j * (23.75 + 1) + 1 + "%"}`;
      document.querySelector(".container").appendChild(box);

      //     console.log(`
      // .container .box_${i}_${j} {
      //     left: ${i * (23.75 + 1) + 1 + "%"};
      //     top: ${j * (23.75 + 1) + 1 + "%"};
      //   }
      // `)
    }
  }
}

function initActor() {
  data = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // 初始化
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 0) {
        continue;
      }
      let box = document.createElement("div");
      box.setAttribute(
        "class",
        "box actor box_value_" + data[i][j] + " box_" + (j + "_" + i)
      );
      box.innerText = data[i][j];
      document.querySelector(".container").appendChild(box);
    }
  }
}

function init() {
  document.querySelector(".container").innerHTML = "";

  data = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  renderBg();

  newBox();
}

init();

// 映射坐标，抹除方向上的异常
function getCurrentBox(d, i, j) {
  if (d === 0) {
    return [j, i];
  } else if (d === 1) {
    return [i, 3 - j];
  } else if (d === 2) {
    return [3 - j, i];
  } else if (d === 3) {
    return [i, j];
  }
}

// 随机生成一个方块
async function newBox() {
  const list = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j] === 0) {
        list.push([i, j]);
      }
    }
  }
  if (list.length === 0) {
    alert("failed");
  } else {
    let index = Math.floor(Math.random() * list.length, 0);

    const [x, y] = list[index];

    const value = Math.random() > 0.8 ? 4 : 2;

    data[x][y] = value;
    let box = document.createElement("div");
    box.setAttribute(
      "class",
      "box actor animated bounceIn box_value_" + value + " box_" + (y + "_" + x)
    );
    box.innerText = value;
    document.querySelector(".container").appendChild(box);

    // setTimeout(() => {
    //   box.setAttribute("class", "box bounceIn box_value_"+ value +" box_" + (y + "_" + x));
    // },10)
  }

  await sleep(300);
}

let lock = false;

async function move(d) {
  if (lock) {
    return;
  }

  lock = true;

  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      async function compare() {
        const [x, y] = getCurrentBox(d, i, j);
        const dj = data[x][y];

        // 如果当前方块为0，适用移动方案
        if (dj === 0) {
          for (let k = j + 1; k < HEIGHT; k++) {
            const [_x, _y] = getCurrentBox(d, i, k);
            const dk = data[_x][_y];

            if (dk !== 0) {
              const obj = document.querySelector(".actor.box_" + _y + "_" + _x);

              obj.setAttribute(
                "class",
                "box actor box_value_" + dk + " box_" + (y + "_" + x)
              );

              data[x][y] = data[_x][_y];
              data[_x][_y] = 0;

              // 递归调用
              compare();

              break;
            }
          }
        }

        // 如果当前方块不为0，适用比较方案
        if (dj !== 0) {
          for (let k = j + 1; k < HEIGHT; k++) {
            const [_x, _y] = getCurrentBox(d, i, k);
            const dk = data[_x][_y];

            if (dk === 0) {
              continue;
            }

            if (dk !== dj) {
              break;
            }

            const obj = document.querySelector(".actor.box_" + y + "_" + x);

            const obk = document.querySelector(".actor.box_" + _y + "_" + _x);

            obk.setAttribute(
              "class",
              "box actor box_value_" + dk + " remove box_" + (y + "_" + x)
            );

            setTimeout(() => {
              obk.remove();
            }, 300);

            data[x][y] += data[_x][_y];
            data[_x][_y] = 0;

            obj.innerText = data[x][y];
            obj.setAttribute(
              "class",
              "box actor animated once box_value_" +
                data[x][y] +
                " box_" +
                (y + "_" + x)
            );

            break;
          }
        }
      }

      compare();
    }
  }

  await sleep(300);

  await newBox();

  lock = false;

  // console.log(data)
}

document.querySelector(".up").addEventListener("click", function () {
  move(0);
});

document.querySelector(".right").addEventListener("click", function () {
  move(1);
});

document.querySelector(".down").addEventListener("click", function () {
  move(2);
});

document.querySelector(".left").addEventListener("click", function () {
  move(3);
});

document.querySelector(".restart").addEventListener("click", function () {
  // console.log(document.querySelectorAll(".actor"))
  // // .remove()

  init();
});

// 映射键盘按键
document.body.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38: {
      move(0);
      break;
    }

    case 39: {
      move(1);
      break;
    }

    case 40: {
      move(2);
      break;
    }

    case 37: {
      move(3);
      break;
    }
  }
});
