export function formatAssistantResponse(data) {
  if (data.error) return data.error;

  const result = data.result || data.translated || data;

  if (typeof result === "string") return result;

  if (result?.schemes?.length) {
    return result.schemes
      .map((scheme) => `${scheme.name}: ${scheme.reason || scheme.benefits || ""}`)
      .join("\n");
  }

  if (result?.raw) return result.raw;

  return Object.entries(result)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join("\n");
}
