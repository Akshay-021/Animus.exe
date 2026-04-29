import { ASSISTANT_SUGGESTIONS } from "../../utils/constants";

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="suggestion-row">
      {ASSISTANT_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          className="chip"
          onClick={() => onSelect?.(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
