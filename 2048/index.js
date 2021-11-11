import "normalize.css";
import cloneDeep from "lodash/cloneDeep";
import "./index.css";

for (let i = 0; i < 16; i++) {
  let box = document.createElement("div");
  box.setAttribute("class", "box");
  document.querySelector(".bg").appendChild(box);
}

let data = [
  [2, 2, 4, 0],
  [0, 0, 2, 2],
  [2, 4, 4, 2],
  [0, 0, 0, 2],
];

function updateBox(box, i, j) {
  box.setAttribute("class", "box box_" + (i + "_" + j));
  box.style.left = i * 200 + 5 + "px";
  box.style.top = j * 200 + 5 + "px";
  box.innerText = data[i][j];
}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === 0) {
      continue;
    }
    let box = document.createElement("div");
    box.setAttribute("class", "box box_" + (i + "_" + j));
    box.style.left = i * 200 + 5 + "px";
    box.style.top = j * 200 + 5 + "px";
    box.innerText = data[i][j];
    document.querySelector(".actor").appendChild(box);
  }
}

// function compare(x, dd) {
//   const d = dd
//   for(let i = 0; i < d.length; i++) {
//     if(d[i] === 0) {
//       continue
//     }
//     for(let j = i + 1; j < d.length; j++) {
//       if(d[i] === d[j]) {
//         console.log(i, "===", j)
//         d[j] += d[i]
//         d[i] = 0
//         // console.log(".box_"+x+"_"+i)
//         // console.log(".box_"+x+"_"+j)
//         document.querySelector(".box_"+x+"_"+i).remove()
//         document.querySelector(".box_"+x+"_"+j).innerText = d[j]
//         break;
//       }
//       if(d[j] !== 0) {
//         break;
//       }
//     }
//   }
//   return cloneDeep(d)
// }

function compare(x, dd, direction) {
  let a;

  a = dd;

  console.log("a:", a);

  for (let i = 0; i < a.length; i++) {
    if (a[i] === 0) {
      // 移动最近的一个数
      for (let j = i + 1; j < a.length; j++) {
        if (a[j] !== 0) {
          a[i] = a[j];
          a[j] = 0;

          const boxJ = document.querySelector(".box_" + x + "_" + j);
          boxJ.setAttribute("class", "box box_" + (x + "_" + i));
          boxJ.style.top = i * 200 + 5 + "px";

          console.log("移动最近的一个数");
          break;
        }
      }

      console.log(a);

      // 如果没有，跳出查找
      if (a[i] === 0) {
        console.log("没有，跳出查找");
        break;
      }

      // 找到同数，若找到相加并跳过当前循环
      for (let j = i + 1; j < a.length; j++) {
        if (a[j] === a[i]) {
          a[i] += a[j];
          a[j] = 0;

          const boxJ = document.querySelector(".box_" + x + "_" + j);
          boxJ.setAttribute("class", "box remove box_" + (i + "_" + j));
          boxJ.style.top = i * 200 + 5 + "px";

          const boxI = document.querySelector(".box_" + x + "_" + i);
          boxI.innerText = a[i];

          continue;
        }
      }
    }

    // 找到同数，若找到相加并跳过当前循环
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] === a[i]) {
        a[i] += a[j];
        a[j] = 0;

        const boxJ = document.querySelector(".box_" + x + "_" + j);
        boxJ.setAttribute("class", "box remove box_" + (i + "_" + j));
        boxJ.style.top = i * 200 + 5 + "px";

        const boxI = document.querySelector(".box_" + x + "_" + i);
        boxI.innerText = a[i];

        continue;
      }

      if (a[j] !== 0) {
        break;
      }
    }
  }

  return cloneDeep(a);
}

// function compare2(x, dd, direction) {
//   let a;

//   a = dd;

//   console.log("a:", a);

//   for (let i = 0; i < a.length; i++) {
//     if (a[i] === 0) {
//       // 移动最近的一个数
//       for (let j = i + 1; j < a.length; j++) {
//         if (a[j] !== 0) {
//           a[i] = a[j];
//           a[j] = 0;

//           console.log("id:", ".box_" + x + "_" + (4 - j - 1));

//           const boxJ = document.querySelector(".box_" + x + "_" + (4 - j - 1));
//           boxJ.setAttribute("class", "box box_" + (x + "_" + (4 - i - 1)));
//           boxJ.style.top = (4 - 1 - i) * 200 + 5 + "px";

//           console.log("移动最近的一个数");
//           break;
//         }
//       }

//       console.log(a);

//       // 如果没有，跳出查找
//       if (a[i] === 0) {
//         console.log("没有，跳出查找");
//         break;
//       }

//       // 找到同数，若找到相加并跳过当前循环
//       for (let j = i + 1; j < a.length; j++) {
//         if (a[j] === a[i]) {
//           a[i] += a[j];
//           a[j] = 0;

//           const boxJ = document.querySelector(".box_" + x + "_" + (4 - 1 - j));
//           boxJ.setAttribute("class", "box remove box_" + (( 4 - 1- i) + "_" + (4 - 1 - j)));
//           boxJ.style.top = ( 4 - 1- i) * 200 + 5 + "px";

//           const boxI = document.querySelector(".box_" + x + "_" + ( 4 - 1- i));
//           boxI.innerText = a[i];

//           continue;
//         }
//       }
//     }

//     // 找到同数，若找到相加并跳过当前循环
//     for (let j = i + 1; j < a.length; j++) {
//       if (a[j] === a[i]) {
//         a[i] += a[j];
//         a[j] = 0;

//         const boxJ = document.querySelector(".box_" + x + "_" + (4 - 1 - j));
//         boxJ.setAttribute("class", "box remove box_" + (( 4 - 1- i) + "_" + (4 - 1 - j)));
//         boxJ.style.top = ( 4 - 1- i) * 200 + 5 + "px";

//         const boxI = document.querySelector(".box_" + x + "_" + ( 4 - 1- i));
//         boxI.innerText = a[i];

//         continue;
//       }

//       if (a[j] !== 0) {
//         break;
//       }
//     }
//   }

//   return cloneDeep(a);
// }

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

document.querySelector(".down").addEventListener("click", function () {
  console.log("data");
  console.log(data);

  // let d = cloneDeep(data[0]).reverse();
  // console.log(d);
  // let newD = compare2(0, d);
  // console.log("newD");
  // console.log(newD);
  // data[0] = newD.reverse()

  for (let i = 0; i < data.length; i++) {
    let d = cloneDeep(data[i]).reverse();
    let newD = compare2(i, d);
    data[i] = newD.reverse()
  }

  // console.log("data");
  // console.log(data);
  // document.querySelector(".box_0_1").remove()
});

// for (let i = 0; i < 4; i++) {
//   let box = document.createElement("div");
//   box.setAttribute("class", "box");
//   box.style.left = (i % 4) * 200 + 5 + "px";
//   box.style.top = Math.floor(i / 4) * 200 + 5 + "px";
//   box.innerText = "2"
//   document.querySelector(".actor").appendChild(box);
// }
