import React, { useState } from "react";
// This thing is from https://www.npmjs.com/package/react-longpressable. I CAN USE LIBRARY YO
import LongPressable from 'react-longpressable';

export default function Card({ data, updateBoard, flagCard, incrementMoveCount, incrementFlagCount, decrementFlagCount }) {
  const [timerID , settimerID ] = useState(true);
  const [isLongPressing , setIsLongPressing] = useState(false);


  // I stole random_rgba function from https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
  function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }

  const unreavledBackgroundColor = (data) => {
    if ((data.x + data.y) % 2 === 0) {
      return '#6dba54';
    }
    else {
      return '#4f8a3d';
    }
  }

  const reavledBackgroundColor = (data) => {
    if ((data.x + data.y) % 2 === 0) {
      return '#fad3ac';
    }
    else {
      return '#c29970';
    }
  }

  const cardBackgroundColor = (data) => {
    if (data.revealed && data.value === "M") {
      return random_rgba();
    }
    if (data.revealed && data.value !== "M") {
      return reavledBackgroundColor(data);
    }
    if (!data.revealed) {
      return unreavledBackgroundColor(data);
    }
  }

  const style = {
    color: colourful_Number_Card(data.value),
    background: cardBackgroundColor(data)
  }

  const leftClicking = (e) => {
    updateBoard(data);
  };

  const rightClicking = (e) => {
    e.preventDefault();
    if (flagCard(data.x, data.y)) {
      incrementFlagCount();
    }
    else {
      decrementFlagCount();
    }
  };

  const cardContent = (data) => {
    if (data.flagged && !data.revealed) {
      return <img src="/Not-Minesweeper/redflag2.png" alt="flag" id="card_image"></img>
    }
    else if (data.revealed && data.value !== 0) {
      if (data.value === "M") {
        return <img src="/Not-Minesweeper/minesweeper-icon.png" alt="mine" id="card_image"></img>
      }
      return data.value
    }
    return '';
  }

  const longPressPointerUp = (e) => {
    if (e.pointerType === 'mouse') {
      return
    }
    if(timerID && isLongPressing)
    {
      setIsLongPressing(false);
      settimerID(false);
      clearTimeout();
    }
    console.log('longPressPointerUp');
  }

  const longPressPointerDown = (e) => {
    if (e.pointerType === 'mouse') {
      return
    }
    console.log('longPressPointerDown');
    setIsLongPressing(true);
    setTimeout(() => {
      settimerID(true);
      console.log('lol');
    }, 750)
  }

  const longPressPointerMove = (e) => {
    console.log('longPressPointerMove');
  }

  const longPressPointerLeave = (e) => {
    console.log('longPressPointerLeave');
  }

  return (
    <div className="Card unselectable" style={style}
      onClick={(e) => leftClicking(e)}
      onContextMenu={(e) => rightClicking(e)}
      onPointerUp={(e) => longPressPointerUp(e)}
      onPointerDown={(e) => longPressPointerDown(e)}
    >
      {cardContent(data)}
    </div>
  );
}

const colourful_Number_Card = (value) => {
  switch (value) {
    case 1:
      return "#0345fc";
    case 2:
      return "#03fc2c";
    case 3:
      return "#fc0303";
    case 4:
      return "#8403fc";
    case 5:
      return "#5afc03";
    case 6:
      return "#fc03a1";
    case 7:
      return "#fc8c03";
    case 8:
      return "#03fc8c";
    default: return { color: "#03adfc" };
  }
};
