function ListBlock({ title, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <h3>{title}</h3>
      <ul className="result-list">
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function CropCard({ data }) {
  if (!data) {
    return (
      <div className="empty-state">
        <strong>No crop result yet</strong>
        <span>Upload an image and submit the crop form.</span>
      </div>
    );
  }

  const analysis = data.llm_analysis || data.data || data;
  const prediction = data.cnn_prediction;

  return (
    <div className="result-card">
      <p className="eyebrow">Diagnosis result</p>
      <h2>{analysis.final_disease || prediction?.prediction || "Crop analysis"}</h2>

      <div className="metric-row">
        <span>Confidence</span>
        <strong>{analysis.confidence || prediction?.confidence || "Pending"}</strong>
      </div>

      {analysis.explanation && <p className="result-copy">{analysis.explanation}</p>}

      <ListBlock title="Treatment" items={analysis.treatment} />
      <ListBlock title="Prevention" items={analysis.prevention} />

      {prediction && (
        <div className="subtle-box">
          Model prediction: {prediction.prediction} · {prediction.confidence}
        </div>
      )}
    </div>
  );
}
