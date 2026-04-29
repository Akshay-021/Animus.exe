import { useState } from "react";
import Loader from "../components/common/Loader";
import ImageUpload from "../components/input/ImageUpload";
import TextInput from "../components/input/TextInput";
import CropCard from "../components/results/CropCard";
import useTranslation from "../hooks/useTranslation";
import { analyzeCrop } from "../services/api";
import { CROP_STAGES, SYMPTOMS } from "../utils/constants";

const initialForm = {
  crop_type: "",
  location: "",
  crop_stage: "",
  symptoms: [],
  fertilizer: "",
  pesticide: "",
};

export default function CropResult() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSymptom = (symptom) => {
    setForm((prev) => {
      const symptoms = prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((item) => item !== symptom)
        : [...prev.symptoms, symptom];
      return { ...prev, symptoms };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setError("Please upload a crop image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("crop_type", form.crop_type);
    formData.append("location", form.location);
    formData.append("crop_stage", form.crop_stage);
    formData.append("symptoms", form.symptoms.join(", "));
    formData.append("fertilizer_usage", form.fertilizer);
    formData.append("pesticide_usage", form.pesticide);
    formData.append("previous_crop", "");
    formData.append("irrigation_type", "");
    formData.append("use_llm", "true");

    setLoading(true);
    setError("");
    setResult(null);

    try {
      setResult(await analyzeCrop(formData));
    } catch (err) {
      setError(err.message || "Error analyzing crop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page two-column">
      <form className="panel form-panel" onSubmit={handleSubmit}>
        <p className="eyebrow">{t("crop_eyebrow")}</p>
        <h1>{t("crop_heading")}</h1>

        <ImageUpload onUpload={setImage} />

        <div className="field-grid">
          <label>
            {t("crop_type")}
            <TextInput
              required
              value={form.crop_type}
              placeholder="corn"
              onChange={(value) => updateField("crop_type", value)}
            />
          </label>
          <label>
            {t("crop_location")}
            <TextInput
              required
              value={form.location}
              placeholder="Karnataka"
              onChange={(value) => updateField("location", value)}
            />
          </label>
          <label>
            {t("crop_stage")}
            <select required value={form.crop_stage} onChange={(e) => updateField("crop_stage", e.target.value)}>
              <option value="">Select stage</option>
              {CROP_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("crop_fertilizer")}
            <select required value={form.fertilizer} onChange={(e) => updateField("fertilizer", e.target.value)}>
              <option value="">Select usage</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            {t("crop_pesticide")}
            <select required value={form.pesticide} onChange={(e) => updateField("pesticide", e.target.value)}>
              <option value="">Select usage</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <div className="chip-group">
          {SYMPTOMS.map((symptom) => (
            <button
              type="button"
              key={symptom}
              className={form.symptoms.includes(symptom) ? "chip selected" : "chip"}
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>

        <button className="primary" disabled={loading}>
          {t("crop_button")}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <section className="panel">
        {loading ? <Loader text={t("loading")} /> : <CropCard data={result} />}
      </section>
    </div>
  );
}
