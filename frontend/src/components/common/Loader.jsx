export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="spinner" />
      {text}
    </div>
  );
}
