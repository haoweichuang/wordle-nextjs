"use client";

import React, { useEffect, useRef } from "react";
import BulletScreen, { StyledBullet } from "rc-bullets-ts";

export default function Bullet() {
  const isPause = useRef(false);
  const barrageScreen = useRef<BulletScreen | null>(null);

  useEffect(() => {
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
    barrageScreen.current = new BulletScreen(".screen-container", {
      duration: 10,
    });
    // document.addEventListener("visibilitychange", function () {
    //   if (!document.hidden) {
    //     console.log("page is visible");
    //     barrageScreen.current.resize();
    //   } else {
    //     console.log("page is invisible");
    //   }
    // });
    // 监听页面可见性变化
    const handleVisibilityChange = () => {
      if (!document.hidden && barrageScreen.current) {
        console.log("Page is visible");
        barrageScreen.current.resize();
      } else {
        console.log("Page is invisible");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 清理事件监听
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [barrageScreen]);

  /**
   * 发送弹幕
   * @param barrageInfo
   */
  const handleSend = (barrageInfo: { img: string; msg: string }) => {
    // if (barrageInfo && barrageScreen.current ) {
    //   setInterval(() => {
    //     barrageScreen.current.push(
    //       <StyledBullet
    //         head={barrageInfo.img}
    //         msg={barrageInfo.msg}
    //         backgroundColor="rgba(0,0,0,0.4)"
    //       />,
    //       {}
    //     );
    //   }, 500);
    // }
    if (barrageInfo && barrageScreen.current) {
      barrageScreen.current.push(
        <StyledBullet
          head={barrageInfo.img}
          msg={barrageInfo.msg}
          backgroundColor="rgba(0,0,0,0.4)"
        />,
        {}
      );
    } else {
      console.error(
        "BarrageScreen is not initialized or invalid data provided."
      );
    }
  };

  /**
   * 暂停/继续播放弹幕
   */
  const handlePause = () => {
    // if (isPause.current) {
    //   barrageScreen.current.resume();
    //   isPause.current = false;
    // } else {
    //   barrageScreen.current.pause();
    //   isPause.current = true;
    // }
    if (!barrageScreen.current) {
      console.error("BarrageScreen is not initialized.");
      return;
    }

    if (isPause.current) {
      barrageScreen.current.resume();
      isPause.current = false;
      console.log("Resumed barrage.");
    } else {
      barrageScreen.current.pause();
      isPause.current = true;
      console.log("Paused barrage.");
    }
  };
  return (
    <div className="w-full flex screen-container text-black">
      <div className="tools">
        <button
          className="bt text-black border"
          onClick={() =>
            handleSend({
              img: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
              msg: "測試123",
            })
          }
        >
          發送
        </button>
        <button
          className="bt text-black border"
          onClick={() => barrageScreen.current?.clear()}
        >
          清空
        </button>
        <button className="bt text-black border" onClick={handlePause}>
          {isPause.current ? "繼續弹幕" : "暫停弹幕"}
        </button>
      </div>
    </div>
  );
}
