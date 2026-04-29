import { useState } from "react";
import Loader from "../components/common/Loader";
import SchemeCard from "../components/results/SchemeCard";
import useTranslation from "../hooks/useTranslation";
import { fetchSchemes } from "../services/api";

const fieldTranslations = {
  location: "scheme_location",
  income: "scheme_income",
  land: "scheme_land",
  gender: "scheme_gender",
  need: "scheme_need",
};

export default function SchemeResult() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    location: "Karnataka",
    income: "low",
    land: "small",
    gender: "male",
    need: "financial support",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    try {
      setData(await fetchSchemes(form));
    } catch (err) {
      setError(err.message || "Scheme request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page two-column">
      <form className="panel form-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">{t("scheme_eyebrow")}</p>
        <h1>{t("scheme_heading")}</h1>
        <div className="field-grid">
          {Object.entries(form).map(([key, value]) => (
            <label key={key}>
              {t(fieldTranslations[key] || key)}
              <input value={value} onChange={(e) => updateField(key, e.target.value)} />
            </label>
          ))}
        </div>
        <button className="primary" disabled={loading}>
          {t("scheme_button")}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <section className="panel result-stack">
        {loading && <Loader text={t("loading")} />}
        {data?.schemes?.map((scheme, index) => (
          <SchemeCard key={`${scheme.name}-${index}`} scheme={scheme} />
        ))}
      </section>
    </div>
  );
}
