import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="theme-toggle-section">
      <div className="theme-toggle">
        <span className="theme-label">Dark Mode</span>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="theme-toggle"
            className="toggle-checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <label htmlFor="theme-toggle" className="toggle-label">
            <div className="toggle-slider">
              <span
                className={`toggle-icon light ${isDarkMode ? "hidden" : ""}`}
              >
                ☀️
              </span>
              <span
                className={`toggle-icon dark ${!isDarkMode ? "hidden" : ""}`}
              >
                🌙
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
