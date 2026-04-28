const BASE_URL = "http://localhost:8000"

export const sendVoice = async (audioBlob) => {
  const formData = new FormData()
  formData.append("file", audioBlob)

  const res = await fetch(`${BASE_URL}/assistant/voice`, {
    method: "POST",
    body: formData
  })

  return res.json()
}