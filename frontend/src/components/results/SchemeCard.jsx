export default function SchemeCard({ scheme }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "8px"
    }}>
      <h3>{scheme.name}</h3>
      <p><b>Why:</b> {scheme.reason}</p>
      <p><b>Benefits:</b> {scheme.benefits}</p>
      <p><b>Steps:</b> {scheme.steps}</p>
    </div>
  );
}