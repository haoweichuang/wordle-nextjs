import React from "react";

interface KeyBoardProps {
  onKeyPress: (key: string) => void;
  usedLetters: { [key: string]: string };
}

function KeyBoard({ onKeyPress, usedLetters }: KeyBoardProps) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const color = usedLetters[key] || "";
            return (
              <button
                key={key}
                className={`keyboard-key ${color}`}
                onClick={(event) => {
                  // event.preventDefault();
                  onKeyPress(key);
                  event.currentTarget.blur();
                }}
                disabled={color === "grey"}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default KeyBoard;
