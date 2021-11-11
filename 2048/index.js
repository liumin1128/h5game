import "normalize.css";
import cloneDeep from "lodash/cloneDeep";
import "./index.css";

const WIDTH = 4;
const HEIGHT = 4;

for (let i = 0; i < 16; i++) {
  let box = document.createElement("div");
  box.setAttribute("class", "box");
  document.querySelector(".bg").appendChild(box);
}

let data = [
  [2, 0, 4, 0],
  [0, 0, 2, 2],
  [2, 4, 4, 2],
  [0, 0, 0, 2],

  // [0, 0, 0, 0],
  // [0, 0, 0, 2],
  // [0, 0, 0, 2],
  // [0, 0, 0, 2],
];

function updateBox(box, i, j) {
  box.setAttribute("class", "box box_" + (i + "_" + j));
  box.style.left = i * 200 + 5 + "px";
  box.style.top = j * 200 + 5 + "px";
  box.innerText = data[i][j];
}

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

    data[x][y] = 2
    let box = document.createElement("div");
    box.setAttribute("class", "box box_value_"+ 2 +" box_" + (y + "_" + x));
    box.innerText = 2
    document.querySelector(".actor").appendChild(box);
  }
}

let lock = false

async function move(d) {

  console.log("data")
  console.log(data)

  if(lock) {
    return
  }

  lock = true
  // const r = getCurrentBox(0, 0, 1);
  // await sleep(1000)


  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {

      // await sleep(100)

      async function comparet1 () {
      
        const [x, y] = getCurrentBox(d, i, j);
        const dj = data[x][y]


        if (dj === 0) {
          for (let k = j + 1; k < HEIGHT; k++) {
            const [_x, _y] = getCurrentBox(d, i, k);
            const dk = data[_x][_y]

            if (dk !== 0) {

              const obj = document.querySelector(".box_" + _y + "_" + _x);
              obj.setAttribute("class", "box box_value_"+ dk +" box_" + (y + "_" + x));
              
              data[x][y] = data[_x][_y];
              data[_x][_y] = 0

              comparet1()

              break;
            }
          }
        }

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
            
            obk.setAttribute("class", "box box_value_"+ dk +" remove box_" + (y + "_" + x));
            
            setTimeout(() => {
              obk.remove()
            }, 1000)

            data[x][y] += data[_x][_y];
            data[_x][_y] = 0

            obj.innerText = data[x][y]
            obj.setAttribute("class", "box box_value_"+ data[x][y] +" box_" + (y + "_" + x));

            // comparet1()

            break;

          }
        }
      }

      comparet1()
   
    }
  }

  await sleep(500)
  await newBox()

  lock = false

  console.log(data)
}

// move();

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