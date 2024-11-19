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

  const getKeyClass = (key: string) => {
    const color = usedLetters[key];
    const baseClass =
      "min-w-[40px] h-[52px] sm:min-w-[32px] sm:h-[45px] m-[3px] rounded-md font-bold uppercase transition-all duration-200";
    const specialClass =
      key === "Enter" || key === "Backspace"
        ? "min-w-[65px] text-sm border-4"
        : "";

    let colorClass = "bg-gray-200";
    if (color === "green") colorClass = "bg-green-500 text-white";
    if (color === "yellow") colorClass = "bg-yellow-500 text-white";
    if (color === "grey") colorClass = "bg-gray-500 text-white";

    return `${baseClass} ${specialClass} ${colorClass}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={(event) => {
                onKeyPress(key);
                event.currentTarget.blur();
              }}
              disabled={usedLetters[key] === "grey"}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default KeyBoard;
