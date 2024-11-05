import React from "react";

interface GameBoardProps {
  currentGuess: string;
  guesses: string[];
  guessResults: string[][];
}

function GameBoard({ currentGuess, guesses, guessResults }: GameBoardProps) {
  const rows = 6;
  const cols = 5;

  return (
    <div className="game-board">
      <div className="board-main">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className={`board-row row_${rowIndex + 1}`}>
            {Array.from({ length: cols }).map((_, colIndex) => {
              let letter = "";
              let color = "";
              if (rowIndex < guesses.length) {
                letter = guesses[rowIndex][colIndex] || "";
                color = guessResults[rowIndex][colIndex];
              } else if (rowIndex === guesses.length) {
                letter = currentGuess[colIndex] || "";
              }
              return (
                <div key={colIndex} className={`board-cell ${color}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
