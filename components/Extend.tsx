"use client";

import React, { useEffect, useRef, useState } from "react";

interface Bullet {
  id: number;
  text: string;
  top: number;
}

interface ChangeEvent {
  target: {
    value: string;
  };
}

export default function Extend() {
  const [bullet, setBullet] = useState<string>("");
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const bulletIdRef = useRef(0);

  const createBullet = (text: string) => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    // 確保彈幕不會超出容器
    const maxTop = Math.max(0, containerHeight - 40); // 40px 為彈幕高度
    const randomTop = Math.random() * maxTop;

    return {
      id: bulletIdRef.current++,
      text,
      top: randomTop,
    };
  };

  const handleChange = (e: ChangeEvent) => {
    setBullet(e.target.value);
  };

  const handleSend = () => {
    if (bullet.trim()) {
      const newBullet = createBullet(bullet);
      setBullets((prev) => [...prev, newBullet]);
      setBullet("");

      // 移除彈幕
      setTimeout(() => {
        setBullets((prev) => prev.filter((b) => b.id !== newBullet.id));
      }, 90000); // N秒後移除，與動畫時間相同
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full mt-8">
      <div
        ref={containerRef}
        // className="relative w-full h-[20vh] bg-gray-100/50 backdrop-blur-sm rounded-lg overflow-hidden"
        className="w-full h-[20vh] bg-gray-100/50 backdrop-blur-sm rounded-lg overflow-hidden"
      >
        {bullets.map((bullet) => (
          <div
            key={bullet.id}
            className="absolute whitespace-nowrap animate-bullet"
            style={{
              top: `${bullet.top}px`,
              transform: "translateX(100%)",
              right: "0",
            }}
          >
            <span className="inline-block px-4 py-2 bg-black/50 text-white rounded-full backdrop-blur-sm">
              {bullet.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4 justify-center">
        <input
          type="text"
          value={bullet}
          onChange={handleChange}
          className="px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="輸入彈幕內容..."
          maxLength={50}
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          發送
        </button>
      </div>
      <div></div>
    </div>
  );
}
