import React from "react";

function Timer() {
  return (
    <div className="timer-container flex flex-col w-full h-full max-w-full">
      <div className="timer-head flex items-center justify-center  h-[20px]">
        Timer
      </div>
      <div className="timer-body flex-1 rounded-lg bg-gray-100 m-10"></div>
    </div>
  );
}

export default Timer;
