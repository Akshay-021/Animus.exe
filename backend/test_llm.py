from app.services.ollama_service import ask_ollama

response = ask_ollama("Explain soil health in simple terms")

print(response)