const BASE_URL = "http://127.0.0.1:8000";

export async function translate(text, targetLang = "en") {
  const response = await fetch(`${BASE_URL}/translate/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, target_language: targetLang }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Translation failed");
  }

  const data = await response.json();
  return data.translated || data.text || data.message || text;
}
