import { useState } from "react";
import "./coffee.css";

const cardNumber = "4916 9903 4324 1615";

const texts = {
  en: {
    copied: "Copied",
    copy: "Copy card number",
    message:
      "If this dictionary helps you, you can support development with a small donation.",
    title: "Buy me a coffee",
  },
  uz: {
    copied: "Nusxalandi",
    copy: "Karta raqamini nusxalash",
    message:
      "Agar ushbu lug'at foydali bo'lsa, kichik donat bilan rivojlanishni qo'llab-quvvatlashingiz mumkin.",
    title: "Buy me a coffee",
  },
};

function Coffee({ language = "uz" }) {
  const [isCopied, setIsCopied] = useState(false);
  const t = language === "en" ? texts.en : texts.uz;

  async function handleCopyCard() {
    try {
      await navigator.clipboard.writeText(cardNumber);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <section className="coffee-container">
      <div aria-hidden="true" className="emoji-big">
        {"\u2615"}
      </div>
      <h3>{t.title}</h3>
      <p>{t.message}</p>
      <div className="coffee-payment">
        <div className="coffee-number">{cardNumber}</div>
        <button
          aria-label={t.copy}
          className={`copy-card-btn ${isCopied ? "is-copied" : ""}`}
          onClick={handleCopyCard}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect height="12" rx="2" ry="2" width="12" x="9" y="9" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      </div>
      <p className={`copy-status ${isCopied ? "show" : ""}`}>{t.copied}</p>
    </section>
  );
}

export default Coffee;
