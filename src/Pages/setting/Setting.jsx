import Coffee from "../Coffee/Coffee.jsx";
import "./setting.css";

const texts = {
  en: {
    description: "Manage app appearance and language.",
    language: "App language",
    languageEn: "English",
    languageUz: "Uzbek",
    support: "Support project",
    theme: "Theme",
    themeDark: "Dark",
    themeLight: "Light",
    title: "Settings",
  },
  uz: {
    description: "Ilova ko'rinishi va tilini sozlang.",
    language: "Ilova tili",
    languageEn: "Inglizcha",
    languageUz: "O'zbekcha",
    support: "Loyihani qo'llab-quvvatlash",
    theme: "Mavzu",
    themeDark: "Qorong'i",
    themeLight: "Yorug'",
    title: "Sozlamalar",
  },
};

export default function Setting({
  language,
  onLanguageChange,
  onThemeChange,
  theme,
}) {
  const t = language === "en" ? texts.en : texts.uz;

  return (
    <div className="setting-container">
      <h2>{t.title}</h2>
      <p>{t.description}</p>

      <div className="setting-item">
        <label htmlFor="theme-select">{t.theme}</label>
        <select
          id="theme-select"
          name="theme"
          onChange={(e) => onThemeChange(e.target.value)}
          value={theme}
        >
          <option value="light">{t.themeLight}</option>
          <option value="dark">{t.themeDark}</option>
        </select>
      </div>

      <div className="setting-item">
        <label htmlFor="language-select">{t.language}</label>
        <select
          id="language-select"
          name="language"
          onChange={(e) => onLanguageChange(e.target.value)}
          value={language}
        >
          <option value="uz">{t.languageUz}</option>
          <option value="en">{t.languageEn}</option>
        </select>
      </div>

      <section className="support-section">
        <h3>{t.support}</h3>
        <Coffee language={language} />
      </section>
    </div>
  );
}
