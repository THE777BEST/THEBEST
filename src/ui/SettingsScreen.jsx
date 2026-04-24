import Coffee from "../Pages/Coffee/Coffee.jsx";
import { SegmentedControl } from "./SegmentedControl.jsx";

function SettingCard({ children, title }) {
  return (
    <section className="rounded-[28px] border border-slate-200/70 bg-white/78 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:shadow-[0_18px_45px_rgba(2,12,25,0.3)]">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function SettingsScreen({
  appLanguage,
  onLanguageChange,
  onThemeChange,
  text,
  theme,
}) {
  return (
    <section className="space-y-4 animate-fade-in">
      <SettingCard title={text.settings.appLanguage}>
        <SegmentedControl
          ariaLabel={text.settings.appLanguage}
          onChange={onLanguageChange}
          options={[
            { label: text.common.english, value: "en" },
            { label: text.common.uzbek, value: "uz" },
          ]}
          value={appLanguage}
        />
      </SettingCard>

      <SettingCard title={text.settings.theme}>
        <SegmentedControl
          ariaLabel={text.settings.theme}
          onChange={onThemeChange}
          options={[
            { label: text.common.dark, value: "dark" },
            { label: text.common.light, value: "light" },
          ]}
          value={theme}
        />
      </SettingCard>

      <SettingCard title={text.settings.support}>
        <Coffee language={appLanguage} />
      </SettingCard>
    </section>
  );
}
