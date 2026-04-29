export default function SchemeCard({ scheme }) {
  return (
    <article className="result-card compact">
      <h2>{scheme.name}</h2>
      <p>{scheme.reason}</p>
      <div className="subtle-box">
        <strong>Benefits</strong>
        <span>{scheme.benefits}</span>
      </div>
      <div className="subtle-box">
        <strong>Steps</strong>
        <span>{scheme.steps}</span>
      </div>
    </article>
  );
}
