"use client";

import React, { useEffect, useRef, useState } from "react";
import BulletScreen, { StyledBullet } from "rc-bullets";

interface BulletScreenType {
  push: (content: React.ReactNode | object) => void;
  clear: () => void;
}

export default function BulletScreenExtend() {
  const headUrl =
    "https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg";
  const [screen, setScreen] = useState<BulletScreenType | null>(null);
  const [bullet, setBullet] = useState<string>("");

  useEffect(() => {
    try {
      const bulletScreen = new BulletScreen(".screen", {
        duration: 20,
        trackHeight: 50,
      });
      setScreen(bulletScreen);

      return () => {
        bulletScreen.clear();
      };
    } catch (error) {
      // console.error("初始化彈幕失敗:", error);
      console.log("發送彈幕失敗:", error);
    }
  }, []);

  // useEffect(() => {
  //   // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
  //   let s = new BulletScreen(".screen", { duration: 20 });
  //   // or
  //   // let s=new BulletScreen(document.querySelector('.screen));
  //   setScreen(s);
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBullet(e.target.value);
  };

  const handleSend = () => {
    if (!bullet.trim() || !screen) return;

    try {
      // 發送純文字彈幕
      screen.push({
        msg: bullet,
        head: headUrl,
        color: "#ffffff",
        size: "large" as const,
        backgroundColor: "rgba(0,0,0,0.5)",
      });

      // 清空輸入
      setBullet("");
    } catch (error) {
      // console.error("發送彈幕失敗:", error);
      console.log("發送彈幕失敗:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    // <div
    //   className="screen-container"
    //   style={{ height: "200px", width: "100%", border: "1px solid black" }}
    // >
    //   <button
    //     className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    //     onClick={handleSend}
    //   >
    //     發送彈幕
    //   </button>
    // </div>
    <main className="bulletScreenExtend border">
      <div
        className="screen border"
        style={{ width: "100vw", height: "40vh" }}
      ></div>
      <input className="border" value={bullet} onChange={handleChange} />
      <button onClick={handleSend}>發送彈幕</button>
    </main>
  );
}
