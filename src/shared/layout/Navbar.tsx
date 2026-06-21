import { Link } from "react-router-dom";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        Ulvi.dev
      </Link>

      <nav>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#timeline">Timeline</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>

        <button
          type="button"
          className={`theme-toggle ${isDark ? "theme-toggle--dark" : "theme-toggle--light"}`}
          onClick={toggleTheme}
          aria-label={isDark ? "Light mode aktiv et" : "Dark mode aktiv et"}
        >
          <span className="theme-toggle__track">
            <span className="theme-toggle__decor theme-toggle__decor--stars">
              <i />
              <i />
              <i />
            </span>

            <span className="theme-toggle__decor theme-toggle__decor--clouds">
              <i />
              <i />
              <i />
            </span>

            <span className="theme-toggle__thumb">
              {isDark ? (
                <BsMoonStarsFill className="theme-toggle__icon theme-toggle__icon--moon" />
              ) : (
                <BsSunFill className="theme-toggle__icon theme-toggle__icon--sun" />
              )}
            </span>
          </span>
        </button>
      </nav>
    </header>
  );
}