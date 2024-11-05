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
    <div className="flex justify-center items-center mb-8">
      <div className="grid gap-1 p-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {Array.from({ length: cols }).map((_, colIndex) => {
              let letter = "";
              let colorClass = "bg-white border-2 border-gray-300";
              if (rowIndex < guesses.length) {
                letter = guesses[rowIndex][colIndex] || "";
                const result = guessResults[rowIndex][colIndex];
                colorClass = result === "green" 
                  ? "bg-green-500 text-white border-green-500" 
                  : result === "yellow"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : result === "grey"
                  ? "bg-gray-500 text-white border-gray-500"
                  : colorClass;
              } else if (rowIndex === guesses.length) {
                letter = currentGuess[colIndex] || "";
              }
              return (
                <div
                  key={colIndex}
                  className={`w-14 h-14 sm:w-12 sm:h-12 flex justify-center items-center text-2xl font-bold rounded transition-colors duration-200 ${colorClass}`}
                >
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
