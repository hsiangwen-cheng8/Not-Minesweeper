import React, { useState, useEffect } from "react";
import config from "../config";
import Card from "./Card";
import Timer from "./Timer"
// This thing is from https://www.npmjs.com/package/react-longpressable. I CAN USE LIBRARY YO
// import LongPressable from 'react-longpressable';

const Board = () => {

    const [board, setBoard] = useState([]);
    const [level, setLevel] = useState('easy');
    const [mineLocation, setMineLocations] = useState([]);
    const [moveCount, setMoveCount] = useState(0);
    const [flagCount, setFlagCount] = useState(0);
    const [mineCount, setMineCount] = useState(0);
    const [elapsedTime, setTime] = useState(0);
    const [gameOver, setGame] = useState(0);


    useEffect(() => {
        new_Board(level, false);
    }, []);

    const new_Board = (level, first_move) => {
        setGame(true);
        setTime(-1);
        const { grid_w, grid_l, mine_num } = config[level];
        const board = create_Board(grid_w, grid_l, mine_num, level, first_move);
        setBoard(board.board);
        setMineLocations(board.mineLocation);
        setMoveCount(0);
        setFlagCount(0);
        setMineCount(mine_num);
    }

    function create_Board(grid_w, grid_l, mine_num, level, first_move) {
        let board = [];
        let mineLocation = [];

        board = populate_Empty_Board(grid_w, grid_l, board);

        if (first_move) {
            mineLocation = inject_Mines(grid_w, grid_l, mine_num, board, mineLocation, level);
            board = calculate_Card_Value(grid_w, grid_l, board);
        }

        return { board, mineLocation };
    }

    function too_easy_mode() {
        setLevel('too_easy');
        new_Board('too_easy');
    }

    function easy_mode() {
        setLevel('easy');
        new_Board('easy');
    }

    function kinda_easy_mode() {
        setLevel('kinda_easy');
        new_Board('kinda_easy');
    }

    function incrementMoveCount() {
        setMoveCount(prevCount => prevCount + 1);
    }

    function setElapsedTime(time) {
        setTime(time);
    }

    function incrementFlagCount() {
        setFlagCount(prevCount => prevCount + 1);
        // console.log('flagCount increase to:', flagCount+1);
        const { mine_num } = config[level];
        // console.log('MineCount decrease to:',mine_num-flagCount-1);
        setMineCount(mine_num - flagCount - 1)
    }

    function decrementFlagCount() {
        setFlagCount(prevCount => prevCount - 1);
        // console.log('flagCount decrease to:', flagCount-1);
        const { mine_num } = config[level];
        // console.log('MineCount increase to:',mine_num-flagCount+1);
        setMineCount(mine_num - flagCount + 1)
    }

    function populate_Empty_Board(grid_w, grid_l, board) {
        for (let i = 0; i < grid_w; i++) {
            board.push([]);
            for (let j = 0; j < grid_l; j++) {
                board[i].push({
                    value: 0,
                    x: i,
                    y: j,
                    revealed: false,
                    flagged: false
                });
            }
        }
        return board;
    }

    const notadjacent = (x, y, tx, ty) => {
        for (let xi = x - 1; xi <= x + 1; xi++) {
            for (let yi = y - 1; yi <= y + 1; yi++) {
                if (xi === x && yi === y) {
                    continue
                }
                if (tx === xi && ty === yi) {
                    return false;
                }
            }
        }
        return true;
    }

    function inject_Mines(grid_w, grid_l, mine_num, board, mineLocation, level, x, y) {
        let minereveal = false;
        if (level === 'too_easy') {
            minereveal = false;
        }
        for (let mineCount = 0; mineCount < mine_num;) {
            // let mine = board[getRandomInt(grid_w - 1)][getRandomInt(grid_l - 1)];
            let mine = board[getRandomInt(grid_w)][getRandomInt(grid_l)];
            if (mine.value === 0 && notadjacent(x, y, mine.x, mine.y) && x !== mine.x && y !== mine.y) {
                mine.value = "M";
                mine.revealed = minereveal;
                mineLocation.push([mine.x, mine.y]);
                mineCount++;
            }
        }

        return mineLocation;
    }

    function calculate_Card_Value(grid_w, grid_l, board) {
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
                        if (board[xi][yi].value === "M") {
                            surround_mine_num++;
                        }
                    }
                }
                board[x][y].value = surround_mine_num;
            }
        }
        return board;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const first_move_Portection = (board, x, y) => {
        if (moveCount === 0) {
            const { grid_w, grid_l, mine_num } = config[level];
            let mineLocation = [];
            let new_board = [...board];
            mineLocation = inject_Mines(grid_w, grid_l, mine_num, new_board, mineLocation, level, x, y);
            new_board = calculate_Card_Value(grid_w, grid_l, new_board);
            setBoard(new_board);
            setMineLocations(mineLocation);
            setMoveCount(1);
            setGame(false);
            return true;
        }
        return false;
    }

    const revealAllMines = (updated_board) => {
        for (let i = 0; i < mineLocation.length; i++) {
            if (!updated_board[mineLocation[i][0]][mineLocation[i][1]].revealed) {
                updated_board[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
                setBoard(updated_board);
            }
        }
    }

    const checkWinGame = () => {
        const { grid_w, grid_l, mine_num } = config[level];
        return checkNonMinesAmount(grid_w, grid_l) === grid_w * grid_l - mine_num;
    }

    const sendEndGameMessage = (win) => {
        let end_game_message = 'You suck! You lose!';
        if (win) {
            end_game_message = 'Damn, You Win!';
        }
        document.getElementById('overlay').style.visibility = "visible";
        document.getElementById('end game message').innerHTML = end_game_message;
        document.getElementById('moveCount').innerHTML = moveCount + 1;
        // document.getElementById('elapsedTime').innerHTML = moveCount + 1;
        setGame(true);
    }

    function updateBoard(data, e) {
        // console.log(data);
        if (data.revealed || data.flagged) {
            return;
        }
        if (!data.revealed) {
            incrementMoveCount();
        }

        let updated_board = [...board];
        // Make first move always valid
        first_move_Portection(updated_board, data.x, data.y)
        if (updated_board[data.x][data.y].value === "M") {
            revealAllMines(updated_board);
            sendEndGameMessage(false);
        } else {
            updated_board = revealCard(updated_board, data.x, data.y);
            if (!updated_board) {
                return;
            }
            if (checkWinGame()) {
                sendEndGameMessage(true);
            }
        }
    };

    const checkNonMinesAmount = (grid_w, grid_l) => {
        let non_mine_num = 0;
        for (let i = 0; i < grid_w; i++) {
            for (let j = 0; j < grid_l; j++) {
                if (board[i][j].value !== "M" && board[i][j].revealed === true) {
                    non_mine_num++;
                }
            }
        }
        return non_mine_num;
    }

    const flagCard = (x, y) => {
        let updated_board = [...board];
        updated_board[x][y].flagged = !updated_board[x][y].flagged;
        setBoard(updated_board);
        return updated_board[x][y].flagged;
    };

    const revealCard = (board, x, y) => {
        let value = board[x][y].value;
        if (value === 0) {
            if (board[x][y].revealed === false) {
                board[x][y].revealed = true;
            }
            revealAdjacentCard(board, x, y);
        }
        else if (value >= 1) {
            board[x][y].revealed = true;
        }

        return board;
    }

    const indexBoundsCheck = (x, y) => {
        const { grid_w, grid_l } = config[level];
        let isInBound = (x >= 0 && x < grid_w && y >= 0 && y < grid_l);
        return isInBound;
    }

    const revealAdjacentCard = (board, x, y) => {
        for (let xi = x - 1; xi <= x + 1; xi++) {
            for (let yi = y - 1; yi <= y + 1; yi++) {
                if (indexBoundsCheck(xi, yi) && !board[xi][yi].revealed) {
                    board = revealCard(board, xi, yi);
                }
            }
        }

        return board;
    }

    const restart = () => {
        new_Board(level);
        document.getElementById('overlay').style.visibility = "hidden";
    }

    return (
        <div className="game">
            <div className="status-bar">
                <div className="Timer">
                    <Timer gameOver={gameOver} sendTime={setElapsedTime} />
                </div>
                <div className="Mine Count">
                    <span><span role="img" aria-label="Flag">🚩</span>Mine Count:{mineCount} </span>
                </div>
                <div className="Move Count">
                    <span>Move Count:{moveCount} </span>
                </div>
                <div className="level">
                    <span>Level:{level} </span>
                    <button type="radio" onClick={too_easy_mode} >Too_Easy</button>
                    <button type="radio" onClick={easy_mode} defaultChecked >Easy</button>
                    <button type="radio" onClick={kinda_easy_mode}>Kinda_Easy</button>
                </div>
            </div>
            <div className='Board'>
                {board.map((row, key) => {
                    return (
                        <div className="d-flex justify-content-center" key={key}>
                            {row.map((data, key) => {
                                return (
                                    <Card
                                        key={key}
                                        data={data}
                                        updateBoard={updateBoard}
                                        flagCard={flagCard}
                                        incrementMoveCount={incrementMoveCount}
                                        incrementFlagCount={incrementFlagCount}
                                        decrementFlagCount={decrementFlagCount}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div id="overlay" onClick={restart}>
                <div id="overlayin">
                    <p id="end game message" className="big glow">Congratulations, you won!!!</p>
                    <p className="darker">It took you <span id="moveCount">0</span> moves.</p>
                    <p className="darker">It took you <span id="elapsed time">{elapsedTime + 1} </span> Seconds.</p>
                    <p className="darker">Click/Press anywhere to restart the game.</p>
                </div>
            </div>
        </div>
    );
};

export default Board;