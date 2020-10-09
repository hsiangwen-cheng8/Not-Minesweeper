import React, { useState, useEffect, useRef } from "react";
let timeIntervalId;
export default function Timer({ gameOver, sendTime }) {
    // I took this code from https://medium.com/@dhilipkmr/reacthooks-3f289f2377ab
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const secondsPassed = useRef(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const date = new Date()
            secondsPassed.current = secondsPassed.current + 1;
            sendTime(secondsPassed.current);
            setTime(date.toLocaleTimeString());
        }, 1000);
        if (gameOver) {
            console.log('game over')
            clearTimeout(timeout);
            clearInterval(timeout);
            secondsPassed.current = 0;
        }
        return () => {
            clearTimeout(timeout);
        }

    }, [time, gameOver]);

    return (
        <div>
            <div>Current Time:{time}</div>
            <div id="elapsedTime">Elapsed Time: {secondsPassed.current}</div>
        </div>

    );
}
