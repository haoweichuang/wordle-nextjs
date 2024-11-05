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
    // 初始建立全灰色
    const result = new Array(5).fill("grey");
    const letterCount: { [key: string]: number } = {};

    // 計算correctWord的字母以及數量
    for (let letter of correctWord) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    // 第一次檢查正確位置
    for (let i = 0; i < 5; i++) {
      if (guess[i] === correctWord[i]) {
        result[i] = "green";
        letterCount[guess[i]]--;
      }
    }

    // 第二次檢查正確字母但是是錯誤位置
    for (let i = 0; i < 5; i++) {
      if (result[i] === "grey" && letterCount[guess[i]] > 0) {
        result[i] = "yellow";
        letterCount[guess[i]]--;
      }
    }

    // 更新使用過的字母以利keyboard變色顯示
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

      setCurrentGuess((prev) => {
        let newGuess = prev;
        if (key === "Enter") {
          if (prev.length === 5) {
            const newGuesses = [...guesses, prev];
            setGuesses(newGuesses);
            const result = checkGuess(prev);
            setGuessResults([...guessResults, result]);

            if (prev === correctWord) {
              setGameStatus("won");
            } else if (newGuesses.length === 6) {
              setGameStatus("lost");
            }
            newGuess = "";
          }
        } else if (key === "Backspace") {
          newGuess = prev.slice(0, -1);
        } else if (/^[A-Za-z]$/.test(key) && prev.length < 5) {
          newGuess = prev + key.toUpperCase();
        }
        return newGuess;
      });
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
    <main className="main">
      <GameBoard
        currentGuess={currentGuess}
        guesses={guesses}
        guessResults={guessResults}
      />
      <KeyBoard onKeyPress={handleKeyInput} usedLetters={usedLetters} />
      {gameStatus !== "playing" && (
        <div>
          {gameStatus === "won" ? "恭喜你猜對了！" : "搜哩，你沒有猜對！"}
          正確的是：{correctWord}
        </div>
      )}
    </main>
  );
}

export default MainBoard;
