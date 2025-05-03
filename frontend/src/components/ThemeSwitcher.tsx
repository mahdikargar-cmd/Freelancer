"use client";
import { useTheme } from "./useTheme";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
      <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition duration-300"
      >
        {theme === "dark" ? (
            <FaSun className="text-yellow-400" size={20} />
        ) : (
            <FaMoon className="text-gray-900" size={20} />
        )}
      </button>
  );
};

export default ThemeSwitcher;
