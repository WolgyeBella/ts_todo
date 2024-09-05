import React from "react";
import styles from "./Header.module.css";
import { useDarkMode } from "../context/DarkModeContext";
import { HiMoon, HiSun } from "react-icons/hi";

interface HeaderProps {
  filters: Array<"all" | "active" | "completed">;
  filter: "all" | "active" | "completed";
  onFilterChange: (value: "all" | "active" | "completed") => void;
}

const Header: React.FC<HeaderProps> = ({ filters, filter, onFilterChange }) => {
  const context = useDarkMode();
  if(!context) {
    return null;
  }
  const { darkMode, toggleDarkMode } = context;
  return (
    <header className={styles.header}>
      <button onClick={toggleDarkMode} className={styles.toggle}>
        {!darkMode && <HiMoon />}
        {darkMode && <HiSun />}
      </button>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={value}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
              }`}
              key={value}
              onClick={() =>
                onFilterChange(value as "all" | "active" | "completed")
              }
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
