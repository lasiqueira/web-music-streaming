export default function IconButton({ icon, label, onClick, disabled, variant = "light", round = false }) {
  return (
    <button
      type="button"
      className={`btn btn-sm btn-${variant} icon-btn ${round ? "rounded-circle" : ""}`}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`bi bi-${icon}`} aria-hidden="true" />
    </button>
  );
}
