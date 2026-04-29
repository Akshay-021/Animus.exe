const BASE_URL = "http://127.0.0.1:8000";

async function readError(response, fallback) {
  const text = await response.text();
  return text || fallback;
}

async function postJson(path, payload) {
  return fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function fetchSchemes(payload) {
  const response = await postJson("/scheme/", payload);

  if (!response.ok) {
    throw new Error(await readError(response, "Scheme request failed"));
  }

  return response.json();
}

export async function analyzeCrop(formData) {
  let response = await fetch(`${BASE_URL}/crop/analyze`, {
    method: "POST",
    body: formData,
  });

  if (response.status === 404 || response.status === 405) {
    response = await fetch(`${BASE_URL}/crop/`, {
      method: "POST",
      body: formData,
    });
  }

  if (!response.ok) {
    throw new Error(await readError(response, "Crop analysis failed"));
  }

  return response.json();
}

export async function analyzeSoil(payload) {
  let response = await postJson("/soil/analyze", payload);

  if (response.status === 404 || response.status === 405 || response.status === 422) {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    });

    response = await fetch(`${BASE_URL}/soil/?${params.toString()}`, {
      method: "POST",
    });
  }

  if (!response.ok) {
    throw new Error(await readError(response, "Soil analysis failed"));
  }

  return response.json();
}

export async function sendVoice(blob) {
  const formData = new FormData();
  formData.append("file", blob, "voice.aac");

  const response = await fetch(`${BASE_URL}/assistant/voice`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await readError(response, "Voice request failed"));
  }

  return response.json();
}
