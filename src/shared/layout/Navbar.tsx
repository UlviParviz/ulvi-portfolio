import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsList, BsMoonStarsFill, BsSunFill, BsXLg } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";

const navItems = [
  {
    label: "Education",
    href: "/#education",
  },
  {
    label: "Skills",
    href: "/#skills",
  },
  {
    label: "Projects",
    href: "/#projects",
  },
  {
    label: "Timeline",
    href: "/#timeline",
  },
  {
    label: "Blog",
    href: "/#blog",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === "dark";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className={`navbar ${menuOpen ? "navbar--open" : ""}`}>
      <div className="navbar__bar">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Ulvi.dev
        </Link>

        <button
          type="button"
          className="navbar__burger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <BsXLg /> : <BsList />}
        </button>

        <nav className="navbar__nav">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            className={`theme-toggle ${
              isDark ? "theme-toggle--dark" : "theme-toggle--light"
            }`}
            onClick={toggleTheme}
            aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
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
      </div>
    </header>
  );
}