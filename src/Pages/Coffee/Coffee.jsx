import "./coffee.css";

const texts = {
  en: {
    message:
      "If this dictionary helps you, you can support development with a small donation.",
    title: "Buy me a coffee",
  },
  uz: {
    message:
      "Agar ushbu lug'at foydali bo'lsa, kichik donat bilan rivojlanishni qo'llab-quvvatlashingiz mumkin.",
    title: "Buy me a coffee",
  },
};

function Coffee({ language = "uz" }) {
  const t = language === "en" ? texts.en : texts.uz;

  return (
    <section className="coffee-container">
      <div aria-hidden="true" className="emoji-big">
        {"\u2615"}
      </div>
      <h3>{t.title}</h3>
      <p>{t.message}</p>
      <div className="coffee-number">1234 2345 3456 4567</div>
    </section>
  );
}

export default Coffee;
