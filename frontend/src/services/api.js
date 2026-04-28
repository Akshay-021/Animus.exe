const BASE_URL = "http://127.0.0.1:8000";

export async function fetchSchemes(payload) {
  const res = await fetch(`${BASE_URL}/scheme/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
}