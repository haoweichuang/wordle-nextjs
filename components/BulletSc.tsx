"use client";

import BulletScreen, { StyledBullet } from "rc-bullets-ts";
import { useEffect, useRef, useState } from "react";

export default function BulletSs() {
  const headUrl =
    "https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg";

  const screenElRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<InstanceType<typeof BulletScreen>>();
  const [bullet, setBullet] = useState("");

  useEffect(() => {
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
    screenRef.current = new BulletScreen(screenElRef.current, { duration: 20 });
  }, []);

  return (
    <main className="bullSc border">
      <div
        className="border"
        ref={screenElRef}
        style={{ width: "100vw", height: "40vh" }}
      />
      <input
        className="border"
        value={bullet}
        onChange={({ target: { value } }) => {
          // 弹幕内容输入事件处理
          setBullet(value);
        }}
      />
      <button
        onClick={() => {
          // 发送弹幕
          if (bullet && screenRef.current) {
            // 纯文本调用形式
            // screenRef.current.push(bullet, "pauseOnHover");

            // StyledBullet 调用形式
            // screenRef.current.push(
            //   <StyledBullet
            //     head={headUrl}
            //     msg={bullet}
            //     backgroundColor={"#fff"}
            //     size="small"
            //   />,
            //   "pauseOnHover"
            // );

            // 对象调用形式
            screenRef.current.push(
              {
                msg: bullet,
                head: headUrl,
                color: "#eee",
                size: "small",
                backgroundColor: "rgba(2, 2, 2, .3)",
              },
              "pauseOnHover"
            );
          }
        }}
      >
        發送彈幕！
      </button>
    </main>
  );
}
