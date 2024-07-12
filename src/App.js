import React, { useState } from 'react';
import './App.css';
import './style.css';

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const App = () => {
  const [turnO, setTurnO] = useState(true);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState('');
  const [boxes, setBoxes] = useState(Array(9).fill(''));

  const resetGame = () => {
    setTurnO(true);
    setCount(0);
    setWinner('');
    setBoxes(Array(9).fill(''));
  };

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleBoxClick = (index) => {
    if (!boxes[index] && !winner) { 
      const newBoxes = [...boxes];
      newBoxes[index] = turnO ? 'O' : 'X';
      setBoxes(newBoxes);
      const newTurnO = !turnO;
      setTurnO(newTurnO);
      const newCount = count + 1;
      setCount(newCount);

      const winningPlayer = checkWinner(newBoxes);
      if (winningPlayer) {
        setWinner(winningPlayer);
      } else if (newCount === 9) {
        setWinner('draw');
      }
    }
  };

  return (
    <div className="App">
      <h1><u>Tic Tac Toe</u></h1>
      <div className="container">
        <div className="game">
          {boxes.map((value, index) => (
            <div key={index} className="box" onClick={() => handleBoxClick(index)}>
              {value}
            </div>
          ))}
        </div>
        {winner && (
          <div className="msg-container">
            {winner === 'draw' ? (
              <p id="msg">Game was a Draw.</p>
            ) : (
              <p id="msg"><b>Congratulations<br/> Winner is {winner}</b></p>
            )}
            <button id="new-btn" onClick={resetGame}>New Game</button>
          </div>
        )}
      </div>
      <button id="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;