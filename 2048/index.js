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
//     console.log(`
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
    box.setAttribute("class", "box box_" + (j + "_" + i));
    // box.style.left = i * 200 + 5 + "px";
    // box.style.top = j * 200 + 5 + "px";
    box.innerText = data[i][j];
    document.querySelector(".actor").appendChild(box);
  }
}

function compare(x, dd, direction) {
  let a;
  a = dd;

  // for (let i = 0; i < a.length; i++) {
  //   if (a[i] === 0) {
  //     // 移动最近的一个数
  //     for (let j = i + 1; j < a.length; j++) {
  //       if (a[j] !== 0) {
  //         a[i] = a[j];
  //         a[j] = 0;

  //         const boxJ = document.querySelector(".box_" + x + "_" + j);
  //         boxJ.setAttribute("class", "box box_" + (x + "_" + i));
  //         boxJ.style.top = i * 200 + 5 + "px";

  //         console.log("移动最近的一个数");
  //         break;
  //       }
  //     }

  //     console.log(a);

  //     // 如果没有，跳出查找
  //     if (a[i] === 0) {
  //       console.log("没有，跳出查找");
  //       break;
  //     }

  //     // 找到同数，若找到相加并跳过当前循环
  //     for (let j = i + 1; j < a.length; j++) {
  //       if (a[j] === a[i]) {
  //         a[i] += a[j];
  //         a[j] = 0;

  //         const boxJ = document.querySelector(".box_" + x + "_" + j);
  //         boxJ.setAttribute("class", "box remove box_" + (i + "_" + j));
  //         boxJ.style.top = i * 200 + 5 + "px";

  //         const boxI = document.querySelector(".box_" + x + "_" + i);
  //         boxI.innerText = a[i];

  //         continue;
  //       }
  //     }
  //   }

  //   // 找到同数，若找到相加并跳过当前循环
  //   for (let j = i + 1; j < a.length; j++) {
  //     if (a[j] === a[i]) {
  //       a[i] += a[j];
  //       a[j] = 0;

  //       const boxJ = document.querySelector(".box_" + x + "_" + j);
  //       boxJ.setAttribute("class", "box remove box_" + (i + "_" + j));
  //       boxJ.style.top = i * 200 + 5 + "px";

  //       const boxI = document.querySelector(".box_" + x + "_" + i);
  //       boxI.innerText = a[i];

  //       continue;
  //     }

  //     if (a[j] !== 0) {
  //       break;
  //     }
  //   }
  // }

  // return cloneDeep(a);
}

document.querySelector(".up").addEventListener("click", function () {
  console.log("data");
  console.log(data);

  // let d = cloneDeep(data[0])
  // console.log(d);
  // let newD = compare(0, d);
  // console.log("newD");
  // console.log(newD);
  // data[0] =newD

  // let d = cloneDeep(data[0]);
  // let newD = compare(0, d);
  // console.log("newD");
  // console.log(newD);
  for (let i = 0; i < data.length; i++) {
    let d = cloneDeep(data[i]);
    let newD = compare(i, d);
    data[i] = newD;
  }

  // console.log("data");
  // console.log(data);
  // document.querySelector(".box_0_1").remove()
});

// document.querySelector(".down").addEventListener("click", function () {
//   console.log("data");
//   console.log(data);

//   // let d = cloneDeep(data[0]).reverse();
//   // console.log(d);
//   // let newD = compare2(0, d);
//   // console.log("newD");
//   // console.log(newD);
//   // data[0] = newD.reverse()

//   for (let i = 0; i < data.length; i++) {
//     let d = cloneDeep(data[i]).reverse();
//     let newD = compare(i, d);
//     data[i] = newD.reverse()
//   }

//   // console.log("data");
//   // console.log(data);
//   // document.querySelector(".box_0_1").remove()
// });

// for (let i = 0; i < 4; i++) {
//   let box = document.createElement("div");
//   box.setAttribute("class", "box");
//   box.style.left = (i % 4) * 200 + 5 + "px";
//   box.style.top = Math.floor(i / 4) * 200 + 5 + "px";
//   box.innerText = "2"
//   document.querySelector(".actor").appendChild(box);
// }

// let data = [
//   [2, 0, 4, 0],
//   [0, 0, 2, 2],
//   [2, 4, 4, 2],
//   [0, 0, 0, 2],
// ];

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

async function test1() {
  // const r = getCurrentBox(0, 0, 1);
  // console.log("r");
  // console.log(r);
  await sleep(1000)

  const d = 2;

  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {

      // await sleep(100)

      async function comparet1 () {
      
        const [x, y] = getCurrentBox(d, i, j);
        const dj = data[x][y]

        // console.log(dj)

        if (dj === 0) {
          for (let k = j + 1; k < HEIGHT; k++) {
            const [_x, _y] = getCurrentBox(d, i, k);
            const dk = data[_x][_y]

            if (dk !== 0) {

              const obj = document.querySelector(".box_" + _y + "_" + _x);
              obj.setAttribute("class", "box box_" + (y + "_" + x));
              
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
            
            obk.setAttribute("class", "box remove box_" + (y + "_" + x));
            
            setTimeout(() => {
              obk.remove()
            }, 1000)

            data[x][y] += data[_x][_y];
            data[_x][_y] = 0

            obj.innerText = data[x][y]

            // comparet1()

            break;

          }
        }
      }

      comparet1()
   
    }
    console.log("========");
  }
}

// test1();
