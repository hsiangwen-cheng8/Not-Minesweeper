import React, { useState } from "react";
import { isMobile } from 'react-device-detect';

// Note: I took ideas and geral framwork from this tutorial for minesweeper card: https://www.youtube.com/watch?v=BLdd0zP-tAw&ab_channel=EduRise
// It has a public repository here: https://github.com/dhavaljardosh/minesweeper
// That being said, I re-write most of the functionalities myself. 
// However, essential logic like update the board when click on unreveal card... It will look very similar 
// (I hope I don't get marks off for that since everyone will have similar implementation for essential part)
export default function Card({ data, updateBoard, flagCard, incrementMoveCount, incrementFlagCount, decrementFlagCount }) {
  const [timer, setTimer] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [downTarget, setDownTarget] = useState([]);
  const [moveTarget, setMoveTarget] = useState([]);
  const [movedFlag, setMovedFlag] = useState(false);


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
    // console.log('rightClicking')
    // e.preventDefault();
    if (flagCard(data.x, data.y)) {
      incrementFlagCount();
    }
    else {
      decrementFlagCount();
    }
  };

  const cardContent = (data) => {
    if (data.flagged && !data.revealed) {
      return <img src="/Not-Minesweeper/redflag2.png" className="unselectable" alt="flag" id="card_image"></img>
    }
    else if (data.revealed && data.value !== 0) {
      if (data.value === "M") {
        return <img src="/Not-Minesweeper/minesweeper-icon.png" className="unselectable" alt="mine" id="card_image"></img>
      }
      return data.value
    }
    return '';
  }

  const inMoveRange = (point1, point2) => {
    if (typeof point1 === 'undefined' || typeof point2 === 'undefined') {
      // console.log('inMoveRange argument is undefined')
      return;
    }
    // console.log('inmoverange', point1, point2)
    let distance = Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
    // console.log('inmoverange', distance);
    if (distance > 15) {
      setMovedFlag(true);
    }
  }

  const longPressPointerUp = (e) => {
    // e.preventDefault();
    if (!isMobile) {
      return
    }
    // console.log('longPressPointerUp timeID:', timer, ' isLongPressing', isLongPressing, ' isMobile', isMobile);
    console.log('You moved alway too far:',movedFlag);
    // inMoveRange(downTarget, moveTarget)
    if (timer && isLongPressing && !movedFlag) {
      rightClicking(e);
      clearTimeout(timer);
      setIsLongPressing(false);
      setTimer(false);
    }
    setMoveTarget([]);
    setMovedFlag(false);
  }

  const longPressPointerDown = (e) => {
    if (!isMobile) {
      return
    }
    // console.log('longPressPointerDowntimeID: ', timer, ' isLongPressing', isLongPressing, ' isMobile', isMobile);
    setDownTarget([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
    if (!timer) {
      setIsLongPressing(true);
      setTimeout(() => {
        setTimer(true);
      }, 750)
    }
  }

  const PConContextMenu = (e) => {
    e.preventDefault();
    if (isMobile) {
      return
    }
    rightClicking(e);
  }

  const myOnTouchCancel = (e) => {
    console.log('myOnTouchCancel:', timer, ' isLongPressing', isLongPressing, ' isMobile', isMobile);
  }

  const myOnTouchMove = (e) => {
    setMoveTarget([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
    inMoveRange(downTarget, [e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
  }

  const longPressPointerLeave = (e) => {
    if (!isMobile) {
      return
    }
    console.log('longPressPointerLeave');
    if (timer) {
      clearTimeout(timer);
      setTimer(false);
    }
  }

  return (
    <div className="Card" style={style}
      onClick={(e) => leftClicking(e)}
      onContextMenu={(e) => PConContextMenu(e)}
      onTouchStart={(e) => longPressPointerDown(e)}
      onTouchEnd={(e) => longPressPointerUp(e)}
      onTouchCancel={(e) => myOnTouchCancel(e)}
      onTouchMove={(e) => myOnTouchMove(e)}
    // onPointerMove={(e) => longPressPointerMove(e)}
    // onPointerLeave={(e) => longPressPointerLeave(e)}
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
