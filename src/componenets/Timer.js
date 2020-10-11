import React, { useState, useEffect, useRef } from "react";
export default function Timer({ gameOver, sendTime }) {
    // I took this code from https://medium.com/@dhilipkmr/reacthooks-3f289f2377ab
    // From line 6 to line 15
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const seconds_Passed = useRef(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const date = new Date()
            seconds_Passed.current = seconds_Passed.current + 1;
            sendTime(seconds_Passed.current);
            setTime(date.toLocaleTimeString());
        }, 1000);
        if (gameOver) {
            // console.log('game over')
            clearTimeout(timeout);
            clearInterval(timeout);
            seconds_Passed.current = 0;
        }
        return () => {
            clearTimeout(timeout);
        }

    }, [time, gameOver]);

    return (
        <div>
            <div>Current Time:{time}</div>

            <div id="elapsedTime"><span role="img" aria-label="Timer">⌛</span> Elapsed Time: {seconds_Passed.current}</div>
        </div>

    );
}
