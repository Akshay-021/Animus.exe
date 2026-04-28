export const sendVoiceToAssistant = async (audioBlob) => {
  const formData = new FormData();
  formData.append("file", audioBlob);

  const res = await fetch("http://127.0.0.1:8000/assistant/voice-scheme", {
    method: "POST",
    body: formData,
  });

  return await res.json();
};