"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // initialise from localStorage
    const prefersDark = window.localStorage.getItem("theme") === "dark";
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    window.localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="p-2 rounded-md hover:bg-white/10 transition-colors focus:outline-none"
    >
      {dark ? (
        <SunIcon className="w-5 h-5 text-yellow-300" />
      ) : (
        <MoonIcon className="w-5 h-5 text-blue-900" />
      )}
    </button>
  );
}
