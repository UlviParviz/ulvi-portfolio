import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (isTheme(savedTheme)) {
    return savedTheme;
  }

  const documentTheme = document.documentElement.dataset.theme;

  if (isTheme(documentTheme)) {
    return documentTheme;
  }

  return "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function emitThemeChange(theme: Theme) {
  window.dispatchEvent(
    new CustomEvent<Theme>(THEME_CHANGE_EVENT, {
      detail: theme,
    })
  );
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, []);

  useEffect(() => {
    function handleThemeChange(event: Event) {
      const customEvent = event as CustomEvent<Theme>;

      if (isTheme(customEvent.detail)) {
        setTheme(customEvent.detail);
      }
    }

    function handleStorageChange(event: StorageEvent) {
      if (event.key !== THEME_STORAGE_KEY) return;

      if (isTheme(event.newValue)) {
        setTheme(event.newValue);
        document.documentElement.dataset.theme = event.newValue;
      }
    }

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setThemeValue = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);
    setTheme(nextTheme);
    emitThemeChange(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
      emitThemeChange(nextTheme);

      return nextTheme;
    });
  }, []);

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    setTheme: setThemeValue,
    toggleTheme,
  };
}