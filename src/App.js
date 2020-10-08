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
        <div id="overlay">
          <div id="overlayin">
            <p className="big glow">Congratulations, you won!!!</p>
            <p className="darker">It took you <span className="moveCount">0</span> moves.</p>
            <p className="darker">Click anywhere to start a new game.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
