"use client";

import React, { useState } from "react";

function Setting() {
  const [isColorSettingOpen, setIsColorSettingOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  function toggleColorSetting() {
    setIsColorSettingOpen(!isColorSettingOpen);
  }

  function changeBackgroundColor(color: string) {
    setBackgroundColor(color);
    document.body.style.backgroundColor = color;
  }

  return (
    <div className="setting">
      <button className="color-setting" onClick={toggleColorSetting}>
        顏色設定
      </button>
      <button className="login-setting">登入設定</button>
      {isColorSettingOpen && (
        <div className="color-picker">
          <button onClick={() => changeBackgroundColor("#ffffff")}>白色</button>
          <button onClick={() => changeBackgroundColor("#f0f0f0")}>淺灰</button>
          <button onClick={() => changeBackgroundColor("#e0e0e0")}>深灰</button>
        </div>
      )}
    </div>
  );
}

export default Setting;
