"use client";

import React, { useState, useRef } from "react";

const BulletScreen = () => {
  const [inputText, setInputText] = useState("");
  const bulletScreenRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<number | null>(null);

  // 這邊後續可調整成對接互動者頭像
  const headUrl =
    "https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg";

  // 這邊後續可調整成文字正負向情緒影響顏色
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const createBullet = (text: string, headUrl: string) => {
    if (!bulletScreenRef.current) return;

    const bulletScreen = bulletScreenRef.current;

    // 創建文本 div
    const textDiv = document.createElement("div");
    textDiv.className =
      "text-container text-[20px] absolute whitespace-nowrap inline-block px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm"; // 設置文本 div 的 class
    textDiv.innerText = text; // 文本內容

    // 創建容器 div，這個 div 會包含圖片和文本
    const bulletContainer = document.createElement("div");
    bulletContainer.className =
      "bullet-container absolute flex justify-between";

    // 創建圖片 div
    const imageDiv = document.createElement("div");
    imageDiv.className =
      "head-img-container flex rounded-full backdrop-blur-sm";

    const headImg = document.createElement("img");
    headImg.src = headUrl;
    headImg.alt = "head";
    headImg.style.width = "18px";
    headImg.style.height = "18px";
    headImg.style.borderRadius = "50%";
    headImg.style.marginRight = "1px";

    imageDiv.appendChild(headImg); // 把圖片添加到圖片 div 中

    // 把圖片 div 和文本 div 添加到容器 div 中
    bulletContainer.appendChild(textDiv);
    bulletContainer.appendChild(imageDiv);

    const topMin = 0; //bulletScreen.offsetTop;
    const topMax = topMin + bulletScreen.offsetHeight;

    if (!topRef.current) topRef.current = topMin;
    topRef.current += 50;
    if (topRef.current > topMax - 50) {
      topRef.current = topMin;
    }

    const show = bulletScreen.querySelector(".show");
    show?.appendChild(bulletContainer);

    const _left = bulletScreen.offsetWidth - bulletContainer.offsetWidth;

    bulletContainer.style.left = `${_left}px`;
    bulletContainer.style.top = `${topRef.current}px`;
    bulletContainer.style.color = getRandomColor();

    const time = 20000 + 10000 * Math.random();

    const animate = bulletContainer.animate(
      [{ left: `${_left}px` }, { left: `-${_left}px` }],
      {
        duration: time,
        easing: "linear",
      }
    );

    animate.onfinish = () => bulletContainer.remove();
  };

  const handleSend = () => {
    if (inputText.trim()) {
      createBullet(inputText, headUrl);
      setInputText("");
    }
  };

  const handleClear = () => {
    const show = document.querySelector(".show");
    if (show) show.innerHTML = "";
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bullet-screen-container w-full mt-8">
      <div
        className="bullet-screen h-[20vh] bg-gray-100/50 backdrop-blur-sm rounded-lg m-5 relative overflow-hidden"
        ref={bulletScreenRef}
      >
        <div className="show"></div>
      </div>
      <div className="controls text-center flex gap-2 mt-4 justify-center">
        <input
          type="text"
          className="px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="說點什麼呢？"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleSend} //這邊還沒解決與遊戲的衝突
        >
          發射！
        </button>
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleClear}
        >
          清屏！
        </button>
      </div>
    </div>
  );
};

export default BulletScreen;
