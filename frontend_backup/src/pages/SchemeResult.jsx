import { useState } from "react";
import { fetchSchemes } from "../services/api";

export default function SchemeResult() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const payload = {
    location: "Karnataka",
    income: "low",
    land: "small",
    gender: "male",
    need: "financial support",
  };

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSchemes(payload);
      setData(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Scheme Recommendations</h2>

      <button onClick={handleFetch}>Get Schemes</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data?.schemes?.map((s, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          <h3>{s.name}</h3>
          <p><b>Why:</b> {s.reason}</p>
          <p><b>Benefits:</b> {s.benefits}</p>
          <p><b>Steps:</b> {s.steps}</p>
        </div>
      ))}
    </div>
  );
}