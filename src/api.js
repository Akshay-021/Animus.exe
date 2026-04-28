const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export const api = {
  // Detect intent from query
  detectIntent: (query, language = 'en') =>
    request('/intent', {
      method: 'POST',
      body: JSON.stringify({ query, language }),
    }),

  // Crop disease detection (with image)
  analyzeCrop: (formData) =>
    fetch(`${BASE}/crop/analyze`, { method: 'POST', body: formData })
      .then(r => r.json()),

  // LLM recommendation
  getRecommendation: (payload) =>
    request('/crop/recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Soil advice
  getSoilAdvice: (payload) =>
    request('/soil/advice', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Government schemes
  getSchemes: (payload) =>
    request('/scheme/search', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Voice STT
  transcribeAudio: (formData) =>
    fetch(`${BASE}/voice/transcribe`, { method: 'POST', body: formData })
      .then(r => r.json()),

  // TTS
  synthesizeSpeech: (text, language) =>
    fetch(`${BASE}/voice/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    }).then(r => r.blob()),

  // Translation
  translate: (text, targetLang) =>
    request('/translate', {
      method: 'POST',
      body: JSON.stringify({ text, target_language: targetLang }),
    }),
}
