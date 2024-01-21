import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import confetti from 'canvas-confetti';

const initialSquares = Array(9).fill(null);

function App() {
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkForWinner = (newSquares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        return newSquares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const winningPlayer = checkForWinner(newSquares);
    if (winningPlayer) {
      setWinner(winningPlayer);
      launchConfetti();
    }
  };

  const handleReset = () => {
    setSquares(initialSquares);
    setIsXNext(true);
    setWinner(null);
  };

  function launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="winner-message"
          >
            {winner} Wins!
          </motion.div>
        )}
      </AnimatePresence>
      <div className="board">
        {squares.map((square, index) => (
          <button
            key={index}
            className={`square ${square}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button onClick={handleReset} className="reset-button">
        Reset Game
      </button>
    </div>
  );
}

export default App;