import { NavLink } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import LanguageSelector from "./LanguageSelector";

export default function NavBar() {
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/assistant", label: t("nav_assistant") },
    { to: "/scheme", label: t("nav_schemes") },
    { to: "/crop", label: t("nav_crop") },
    { to: "/soil", label: t("nav_soil") },
  ];

  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark">J</span>
        <span>
          <strong>{t("nav_brand")}</strong>
          <small>{t("nav_tagline")}</small>
        </span>
      </NavLink>

      <nav className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {link.label}
          </NavLink>
        ))}
        <LanguageSelector />
      </nav>
    </header>
  );
}
