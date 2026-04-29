import { useState } from "react";
import Loader from "../components/common/Loader";
import SoilCard from "../components/results/SoilCard";
import useTranslation from "../hooks/useTranslation";
import { analyzeSoil } from "../services/api";

const initialForm = {
  location: "",
  current_crop: "",
  previous_crop: "",
  soil_type: "",
  fertilizer_usage: "",
  irrigation_type: "",
  organic_matter: "",
};

export default function SoilResult() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      setResult(await analyzeSoil({
        ...form,
        fertilizer_frequency: form.fertilizer_usage,
        use_llm: true,
      }));
    } catch (err) {
      setError(err.message || "Error analyzing soil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page two-column">
      <form className="panel form-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">{t("soil_eyebrow")}</p>
        <h1>{t("soil_heading")}</h1>

        <div className="field-grid">
          <label>
            {t("soil_location")}
            <input required value={form.location} onChange={(e) => updateField("location", e.target.value)} />
          </label>
          <label>
            {t("soil_current_crop")}
            <input required value={form.current_crop} onChange={(e) => updateField("current_crop", e.target.value)} />
          </label>
          <label>
            {t("soil_previous_crop")}
            <input required value={form.previous_crop} onChange={(e) => updateField("previous_crop", e.target.value)} />
          </label>
          <label>
            {t("soil_type")}
            <select required value={form.soil_type} onChange={(e) => updateField("soil_type", e.target.value)}>
              <option value="">Select soil</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
            </select>
          </label>
          <label>
            {t("soil_fertilizer")}
            <input required value={form.fertilizer_usage} onChange={(e) => updateField("fertilizer_usage", e.target.value)} />
          </label>
          <label>
            {t("soil_irrigation")}
            <select required value={form.irrigation_type} onChange={(e) => updateField("irrigation_type", e.target.value)}>
              <option value="">Select irrigation</option>
              <option value="rainfed">Rainfed</option>
              <option value="borewell">Borewell</option>
            </select>
          </label>
          <label>
            {t("soil_organic")}
            <select required value={form.organic_matter} onChange={(e) => updateField("organic_matter", e.target.value)}>
              <option value="">Select level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <button className="primary" disabled={loading}>
          {t("soil_button")}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <section className="panel">
        {loading ? <Loader text={t("loading")} /> : <SoilCard data={result} />}
      </section>
    </div>
  );
}
