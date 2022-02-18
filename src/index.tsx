import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import G6 from "@antv/g6";
import { g6Data } from "./data";

console.log(`g6Data--`, g6Data);

const width = (document.getElementById("container") as HTMLElement).scrollWidth;
const height =
  (document.getElementById("container") as HTMLElement).scrollHeight || 800;
const graph = new G6.Graph({
  container: "container",
  width,
  height,
  fitView: true,
  fitCenter: true,
  layout: {
    // type: "comboForce",
    type: "dagre",
    nodeSpacing: (d: any) => 40,
    comboSpacing: 30,
    comboPadding: 2,
  },
  groupByTypes: false,
  defaultCombo: {
    // The type of the combos. You can also assign type in the data of combos
    type: "circle",
    style: {
      fill: "#e6f7ff",
    },
    // labelCfg: {
    //   refY: 2,
    // },
    // ... Other global configurations for combos
  },
  defaultNode: {
    size: 35,
    color: "#5B8FF9",
    style: {
      lineWidth: 2,
      fill: "#C6E5FF",
    },
  },
  defaultEdge: {
    type: "line-dash",
    size: 2,
    style: {
      lineWidth: 2,
      stroke: "#bae7ff",
    },
  },
  modes: {
    default: [
      "drag-combo",
      {
        type: "collapse-expand-combo",
        relayout: false,
      },
      "drag-node",
      "drag-canvas",
      "zoom-canvas",
    ],
  },
});

console.log(`g6Data----`, g6Data);
graph.data(g6Data as any);
graph.render();
