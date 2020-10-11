import React from 'react';
import './App.css';
import Board from "./componenets/Board";

function App() {
  return (
    <div className="App unselectable">
      <div className="container">
        <h1>Not MineSweeper</h1>
        <Board />
      </div>
    </div>
  );
}

export default App;
