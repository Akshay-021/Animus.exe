import { useAppContext } from "../../context/AppContext";
import { LANGUAGES } from "../../utils/constants";

export default function LanguageSelector() {
  const { language, setLanguage } = useAppContext();

  return (
    <label className="language-select">
      <select value={language} onChange={(event) => setLanguage(event.target.value)}>
        {LANGUAGES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
