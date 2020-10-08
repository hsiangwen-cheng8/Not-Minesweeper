import React, { useState, useEffect } from "react";
import config from "../config";

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [level, setLevel] = useState('kinda_easy');
    useEffect(() => {
        new_Board(level);
    }, []);
    
    const new_Board = (level) => {
        const { grid_w, grid_l, mine_num } = config[level];
        const board = create_Board(grid_w, grid_l, mine_num);
    }

    function easy_mode() {
        setLevel('easy');
        new_Board('easy');
    }

    function kinda_easy_mode() {
        setLevel('kinda_easy');
        new_Board('kinda_easy');
    }

    function create_Board(grid_w, grid_l, mine_num) {
        let board = [];
        let mineLocation = [];

        for (let x = 0; x < grid_w; x++) {
            let subColon = [];
            for (let y = 0; y < grid_l; y++) {
                subColon.push({
                    value: 0,
                    revealed: false,
                    x: x,
                    y: y,
                    flagged: false,
                });
            }
            board.push(subColon);
        }

        let mineCount = 0;
        while (mineCount < mine_num) {
            let x = getRandomInt(grid_w - 1);
            let y = getRandomInt(grid_l - 1);

            if (board[x][y].value === 0) {
                board[x][y].value = "M";
                mineLocation.push([x, y]);
                mineCount++;
            }
        }

        for (let x = 0; x < grid_w; x++) {
            for (let y = 0; y < grid_l; y++) {
                if (board[x][y].value === "M") {
                    continue;
                }
                let surround_mine_num = 0;
                for (let xi = x - 1; xi <= x + 1; xi++) {
                    for (let yi = y - 1; yi <= y + 1; yi++) {
                        if ((xi < 0 || xi >= grid_w) ||
                            (yi < 0 || yi >= grid_l) ||
                            (xi === x && yi === y)) {
                            continue
                        }
                        if(board[xi][yi].value === "M")
                        {
                            surround_mine_num++;
                        }
                    }
                }
                board[x][y].value = surround_mine_num;
            }
        }
        return { board, mineLocation };
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    return (
        <div className="container">
            <div className="status-bar">
                <div className="level">
                    <span>Level:{level} </span>
                    <button type="radio" onClick={easy_mode} defaultChecked >Easy</button>
                    <button type="radio" onClick={kinda_easy_mode}>Kinda_easy</button>
                </div>
            </div>
        </div>
    );
};

export default Board;