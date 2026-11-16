import { Link, NavLink, useNavigate } from "react-router";
import { useSessionStore, selectIsLoggedIn } from "../stores/sessionStore";

export default function Header() {
  const isLoggedIn = useSessionStore(selectIsLoggedIn);
  const email = useSessionStore((state) => state.email);
  const logout = useSessionStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar app-navbar sticky-top bg-body-tertiary border-bottom">
      <div className="container-xxl px-3 px-md-4 flex-nowrap">
        <Link className="navbar-brand d-flex align-items-center gap-2 me-2" to="/">
          <i className="bi bi-music-note-beamed text-primary" aria-hidden="true" />
          <span>SISTINTTCC</span>
        </Link>

        <div className="d-flex align-items-center gap-2 min-w-0">
          {isLoggedIn ? (
            <>
              <span className="navbar-text text-truncate d-none d-sm-inline" title={email}>
                {email}
              </span>
              <button type="button" className="btn btn-outline-secondary btn-sm text-nowrap" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1" aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-link btn-sm text-nowrap text-decoration-none" to="/login">
                Sign in
              </NavLink>
              <NavLink className="btn btn-primary btn-sm text-nowrap" to="/signup">
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
