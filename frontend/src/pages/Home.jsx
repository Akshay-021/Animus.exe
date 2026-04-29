import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import dashboardFarm from "../assets/dashboard-farm.png";

export default function Home() {
  const { t } = useTranslation();

  const featureCards = [
    {
      to: "/assistant",
      icon: "🎤",
      titleKey: "assistant_title",
      textKey: "assistant_text",
    },
    {
      to: "/scheme",
      icon: "📋",
      titleKey: "scheme_title",
      textKey: "scheme_text",
    },
    {
      to: "/crop",
      icon: "🌿",
      titleKey: "crop_title",
      textKey: "crop_text",
    },
    {
      to: "/soil",
      icon: "🌱",
      titleKey: "soil_title",
      textKey: "soil_text",
    },
  ];

  return (
    <div className="page">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <p className="eyebrow">{t("home_eyebrow")}</p>
          <h1>{t("home_title")}</h1>
          <p>{t("home_subtitle")}</p>
        </div>
        <img src={dashboardFarm} alt="Farmer checking crops in a field" />
      </section>

      <section className="feature-grid">
        {featureCards.map((card) => (
          <Link key={card.to} to={card.to} className="feature-card">
            <span className="feature-icon">{card.icon}</span>
            <h2>{t(card.titleKey)}</h2>
            <p>{t(card.textKey)}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
