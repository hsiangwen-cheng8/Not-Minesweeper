import React from 'react';
import './App.css';
import Board from "./componenets/Board";

function App() {
  let html = document.querySelector("html");
  console.log("Your render area:", html.clientWidth, "x", html.clientHeight)

  return (
    <div className="App">
      <div className="container">
        <h1>Not MineSweeper</h1>
        <Board />
      </div>
    </div>
  );
}

export default App;
