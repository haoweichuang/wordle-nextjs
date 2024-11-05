import React from "react";
import Setting from "./Setting";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Wordle</h1>
        <Setting />
      </div>
    </header>
  );
}

export default Header;
