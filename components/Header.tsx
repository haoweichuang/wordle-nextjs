"use client"

import React, { useState, useRef, useEffect } from "react";
import Setting from "./Setting";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        // 向下滾動
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } 
        // 向上滾動
        else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    let timeoutId: NodeJS.Timeout;
    const throttledControlHeader = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(controlHeader, 100);
    };

    window.addEventListener("scroll", throttledControlHeader);
    
    return () => {
      window.removeEventListener("scroll", throttledControlHeader);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 
        z-50 bg-white shadow-md 
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 m-0">Wordle</h1>
        <Setting />
      </div>
    </header>
  );
}

export default Header;
