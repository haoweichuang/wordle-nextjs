"use client";

import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./GameBoard";
import KeyBoard from "./Keyboard";

type GameStatus = "playing" | "won" | "lost";

function MainBoard() {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<string[][]>([]);
  const [correctWord, setCorrectWord] = useState("SUPER");
  const [usedLetters, setUsedLetters] = useState<{ [key: string]: string }>({});
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  function checkGuess(guess: string) {
    const result = new Array(5).fill("grey");
    const letterCount: { [key: string]: number } = {};

    for (let letter of correctWord) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    for (let i = 0; i < 5; i++) {
      if (guess[i] === correctWord[i]) {
        result[i] = "green";
        letterCount[guess[i]]--;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (result[i] === "grey" && letterCount[guess[i]] > 0) {
        result[i] = "yellow";
        letterCount[guess[i]]--;
      }
    }

    const newUsedLetters = { ...usedLetters };
    for (let i = 0; i < 5; i++) {
      if (!newUsedLetters[guess[i]] || result[i] === "green") {
        newUsedLetters[guess[i]] = result[i];
      }
    }
    setUsedLetters(newUsedLetters);

    return result;
  }

  const handleKeyInput = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      if (key === "Enter") {
        if (currentGuess.length === 5) {
          const newGuesses = [...guesses, currentGuess];
          setGuesses(newGuesses);
          const result = checkGuess(currentGuess);
          setGuessResults([...guessResults, result]);

          if (currentGuess === correctWord) {
            setGameStatus("won");
          } else if (newGuesses.length === 6) {
            setGameStatus("lost");
          }
          setCurrentGuess("");
        }
      } else if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    },
    [currentGuess, guesses, guessResults, correctWord, gameStatus]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      handleKeyInput(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyInput]);

  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <GameBoard
        currentGuess={currentGuess}
        guesses={guesses}
        guessResults={guessResults}
      />
      {gameStatus !== "playing" && (
        <div className="mt-2 p-2 rounded-lg bg-gray-50 text-lg font-bold">
          {gameStatus === "won" ? "恭喜你猜對了！" : "搜哩，你沒有猜對！"}
          <div className="mt-2">正確的是：{correctWord}</div>
        </div>
      )}
      <KeyBoard onKeyPress={handleKeyInput} usedLetters={usedLetters} />
    </div>
  );
}

export default MainBoard;
