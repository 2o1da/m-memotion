import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// let h2 = document.querySelector("h2");
// let text = document.querySelector("h2").innerHTML;

// h2.innerHTML = "";
// for (let i = 0; i < text.length; ++i) {
//   setTimeout(function () {
//     h2.innerHTML += `${text[i]}`;
//   }, 150 * (i + 1));
// }
