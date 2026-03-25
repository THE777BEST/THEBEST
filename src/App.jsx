import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/navbar/Navbar.jsx";
import Favorites from "./Pages/Favorites/Favorites.jsx";
import Search from "./Pages/Search/Search.jsx";
import Setting from "./Pages/setting/Setting.jsx";
import { toFavoriteWord } from "./utils/favorites.js";
import "./App.css";

const STORAGE_KEYS = {
  favorites: "lugat_favorites",
  fontSize: "lugat_font_size",
  language: "lugat_language",
  theme: "lugat_theme",
};

function readStoredOption(key, fallback, allowedOptions) {
  try {
    const saved = localStorage.getItem(key);
    return allowedOptions.includes(saved) ? saved : fallback;
  } catch {
    return fallback;
  }
}

function readStoredFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.favorites);
    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => toFavoriteWord(item))
      .filter((item) => item.id.length > 0);
  } catch {
    return [];
  }
}

function ExitGuard({ language }) {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const allowNextBackRef = useRef(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    if (!window.history.state?.lugatExitGuard) {
      window.history.pushState(
        { ...(window.history.state ?? {}), lugatExitGuard: true },
        "",
        window.location.href
      );
    }

    function handlePopState() {
      if (allowNextBackRef.current) {
        allowNextBackRef.current = false;
        return;
      }
      setIsDialogOpen(true);
    }

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);

  function stayInApp() {
    setIsDialogOpen(false);
    window.history.pushState(
      { ...(window.history.state ?? {}), lugatExitGuard: true },
      "",
      window.location.href
    );
  }

  function exitApp() {
    setIsDialogOpen(false);
    allowNextBackRef.current = true;
    window.history.back();
  }

  if (!isDialogOpen || location.pathname !== "/") {
    return null;
  }

  return (
    <div className="exit-dialog-backdrop" role="presentation">
      <div
        className="exit-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-dialog-title"
      >
        <h2 id="exit-dialog-title">
          {language === "en" ? "Exit App?" : "Ilovadan Chiqasizmi?"}
        </h2>
        <p>
          {language === "en"
            ? "Are you sure you want to exit the app?"
            : "Aniq ilovadan chiqmoqchimisiz?"}
        </p>
        <div className="exit-dialog-actions">
          <button
            type="button"
            className="exit-dialog-btn exit-dialog-btn-secondary"
            onClick={stayInApp}
          >
            {language === "en" ? "No" : "Yo'q"}
          </button>
          <button
            type="button"
            className="exit-dialog-btn exit-dialog-btn-primary"
            onClick={exitApp}
          >
            {language === "en" ? "Yes" : "Ha"}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() =>
    readStoredOption(STORAGE_KEYS.theme, "light", ["light", "dark"])
  );
  const [language, setLanguage] = useState(() =>
    readStoredOption(STORAGE_KEYS.language, "uz", ["uz", "en"])
  );
  const [fontSize, setFontSize] = useState(() =>
    readStoredOption(STORAGE_KEYS.fontSize, "medium", [
      "small",
      "medium",
      "large",
    ])
  );
  const [favorites, setFavorites] = useState(readStoredFavorites);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
    localStorage.setItem(STORAGE_KEYS.fontSize, fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(word) {
    const favoriteWord = toFavoriteWord(word);
    if (!favoriteWord.id) {
      return;
    }

    setFavorites((prev) => {
      const alreadyFavorite = prev.some((item) => item.id === favoriteWord.id);
      if (alreadyFavorite) {
        return prev.filter((item) => item.id !== favoriteWord.id);
      }
      return [favoriteWord, ...prev];
    });
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <BrowserRouter>
      <ExitGuard language={language} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Search
                favorites={favorites}
                language={language}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                language={language}
                onClearFavorites={clearFavorites}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
        <Route
          path="/settings"
          element={
            <Setting
              fontSize={fontSize}
              language={language}
              onFontSizeChange={setFontSize}
              onLanguageChange={setLanguage}
              onThemeChange={setTheme}
              theme={theme}
            />
          }
        />
        <Route path="/coffee" element={<Navigate replace to="/settings" />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </main>
      <Navbar language={language} />
    </BrowserRouter>
  );
}

export default App;
