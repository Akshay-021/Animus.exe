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

export default function SoilCard({ data }) {
  if (!data) {
    return (
      <div className="empty-state">
        <strong>No soil result yet</strong>
        <span>Enter soil parameters and submit the analysis.</span>
      </div>
    );
  }

  const analysis = data.soil_analysis || data;

  return (
    <div className="result-card">
      <p className="eyebrow">Soil health result</p>
      <h2>{analysis.soil_condition || "Soil analysis"}</h2>

      <div className="metric-row">
        <span>Health score</span>
        <strong>{analysis.soil_health_score ?? "Pending"}</strong>
      </div>

      <ListBlock title="Problems" items={analysis.problems} />
      <ListBlock title="Causes" items={analysis.causes} />
      <ListBlock title="Improvement steps" items={analysis.improvement_steps} />
      <ListBlock title="Fertilizer advice" items={analysis.fertilizer_advice} />
    </div>
  );
}
