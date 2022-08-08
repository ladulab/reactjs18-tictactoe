import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const newSquares = [...squares];
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareFilled) {
      setSquares(initialSquares) 
      return setXIsNext(true);
    }
    newSquares[i] = xIsNext ? "X" : "O";
    
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)} />
    );
  };
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>{" "}
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>{" "}
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div>
        <center>
          <button
            class="btn"
            onClick={() => {
              setSquares(initialSquares);
              setXIsNext(true);
            }}
          >
            <text class="start">Start A New Game!</text>
          </button>
          <hr></hr>
          <div class="footer-c">            
          <text class="copyrights">© 2022 Tic-Tac-Toe board game <pre>Developed by Liron Abutbul</pre></text>
            <img
              src="madewithreactjs.png"
              alt="Application made with ReactJS"
              id="react-js-logo"
            ></img>

          </div>
        </center>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <text class="game-logo">Tic Tac Toe</text>
      <Board />
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagnoals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 'X' or 'O'

    }
  }
  return null;
}
