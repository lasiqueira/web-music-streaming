import { useEffect } from "react";
import { Navigate } from "react-router";
import ErrorNotice from "../components/ErrorNotice";
import { useSessionStore, selectIsLoggedIn } from "../stores/sessionStore";

// Shared shell for the Sign in / Sign up pages: centered card that shrinks to
// full width on phones, and redirects home once the user is logged in.
export default function AuthForm({ title, submitLabel, onSubmit, footer, children }) {
  const isLoggedIn = useSessionStore(selectIsLoggedIn);
  const errors = useSessionStore((state) => state.errors);
  const pending = useSessionStore((state) => state.pending);
  const clearErrors = useSessionStore((state) => state.clearErrors);

  useEffect(() => clearErrors, [clearErrors]);

  if (isLoggedIn) return <Navigate to="/" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <div className="row justify-content-center py-md-4">
      <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h1 className="h3 mb-3">{title}</h1>
            <ErrorNotice errors={errors} onDismiss={clearErrors} />
            <form onSubmit={handleSubmit}>
              {children}
              <button type="submit" className="btn btn-primary w-100" disabled={pending}>
                {pending && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />}
                {submitLabel}
              </button>
            </form>
          </div>
        </div>
        {footer && <p className="text-center text-body-secondary mt-3">{footer}</p>}
      </div>
    </div>
  );
}

export function Field({ label, name, type = "text", autoComplete, minLength, hint }) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-control"
        placeholder={label}
        autoComplete={autoComplete}
        minLength={minLength}
        aria-describedby={hintId}
        required
      />
      {hint && (
        <div id={hintId} className="form-text">
          {hint}
        </div>
      )}
    </div>
  );
}
