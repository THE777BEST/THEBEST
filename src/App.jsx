import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar.jsx";
import Favorites from "./Pages/Favorites/Favorites.jsx";
import Search from "./Pages/Search/Search.jsx";
import Setting from "./Pages/setting/Setting.jsx";
import { toFavoriteWord } from "./utils/favorites.js";
import "./App.css";

const STORAGE_KEYS = {
  favorites: "lugat_favorites",
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

function App() {
  const [theme, setTheme] = useState(() =>
    readStoredOption(STORAGE_KEYS.theme, "light", ["light", "dark"])
  );
  const [language, setLanguage] = useState(() =>
    readStoredOption(STORAGE_KEYS.language, "uz", ["uz", "en"])
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
                language={language}
                onLanguageChange={setLanguage}
                onThemeChange={setTheme}
                theme={theme}
              />
            }
          />
          <Route path="/coffee" element={<Navigate replace to="/settings" />} />
        </Routes>
      </main>
      <Navbar language={language} />
    </BrowserRouter>
  );
}

export default App;
