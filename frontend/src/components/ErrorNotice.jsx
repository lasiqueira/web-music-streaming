export default function ErrorNotice({ errors, onDismiss }) {
  if (!errors?.length) return null;

  return (
    <div className="alert alert-danger d-flex align-items-start gap-2 py-2" role="alert">
      <i className="bi bi-exclamation-triangle-fill flex-shrink-0 mt-1" aria-hidden="true" />
      <ul className="list-unstyled mb-0 flex-grow-1">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      {onDismiss && <button type="button" className="btn-close btn-sm" aria-label="Dismiss" onClick={onDismiss} />}
    </div>
  );
}
