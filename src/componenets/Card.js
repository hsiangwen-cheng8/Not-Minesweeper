import React from "react";

export default function Card({ data, updateBoard, flagCard, incrementMoveCount, incrementFlagCount, decrementFlagCount }) {
  // I stole this function from https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
  function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }


  const style = {
    block: {
      width: 40,
      height: 40,
      color: numColorCode(data.value),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 800,
      fontSize: 30,
      cursor: "pointer",
      background: data.revealed
        ? data.value === "M"
          ? random_rgba()
          : bombChexPattern(data.x, data.y)
        : chexPattern(data.x, data.y),
    },
  };

  const onClickUpdate = (e) => {
    if (data.flagged) {
      return;
    }
    if (!data.revealed) {
      incrementMoveCount();
    }

    updateBoard(data.x, data.y);
  };

  const onClickFlag = (e) => {
    e.preventDefault();
    if(flagCard(data.x, data.y))
    {
      incrementFlagCount();
    }
    else
    {
      decrementFlagCount();
    }
    
  };

  return (
    <div
      className="Card"
      style={style.block}
      onClick={(e) => onClickUpdate(e)}
      onContextMenu={(e) => onClickFlag(e)}
    >
      {data.flagged && !data.revealed ? (
        "🚩"
      ) : data.revealed && data.value !== 0 ? (
        data.value === "M" ? (
          "💣"
        ) : (
            data.value
          )
      ) : (
            ""
          )}
    </div>
  );
}

const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#aad751";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#a2d249";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#a2d249";
  } else {
    return "#aad751";
  }
};

const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#e5c29f";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#d7b899";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#d7b899";
  } else {
    return "#e5c29f";
  }
};

const numColorCode = (num) => {
  if (num === 1) {
    return "#1976d2";
  } else if (num === 2) {
    return "#388d3c";
  } else if (num === 3) {
    return "#d33030";
  } else if (num === 4) {
    return "#7c21a2";
  } else if (num === 5) {
    return "#1976d2";
  } else if (num === 6) {
    return "#1976d2";
  } else {
    return "white";
  }
};
