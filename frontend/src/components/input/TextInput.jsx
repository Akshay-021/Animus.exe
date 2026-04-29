export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}) {
  const input = (
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );

  if (!label) return input;

  return (
    <label>
      {label}
      {input}
    </label>
  );
}
