import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { to: "/festivals",    label: "Festivals"    },
  { to: "/marketplace",  label: "Marketplace"  },
  { to: "/activities",   label: "Activities"   },
  { to: "/moving-guide", label: "Moving Guide" },
  { to: "/visa-info",    label: "Visa Info"    },
  { to: "/food-guide",   label: "Food"         },
  { to: "/weather",      label: "Weather"      },
  { to: "/news",         label: "News"         },
  { to: "/discussions",  label: "Discuss"      },
];

export default function NavBar() {
  const { user, logout, apiFetch } = useAuth();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (!user) { setSavedCount(0); return; }
    apiFetch("/saved")
      .then((r) => (r.ok ? r.json() : []))
      .then((ids: number[]) => setSavedCount(ids.length))
      .catch(() => {});
  }, [user, apiFetch]);

  return (
    <nav className="navbar">
      {/* Top row: brand + user controls */}
      <div className="navbar-top">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="pulse-dot" />
          Pulse Gothenburg
        </Link>

        <div className="navbar-top-right">
          {user ? (
            <>
              <span className="nav-greeting">Hi, {user.name.split(" ")[0]}</span>
              <Link to="/saved" className="saved-pill" onClick={() => setMenuOpen(false)}>
                Saved {savedCount > 0 && <span className="pill-count">{savedCount}</span>}
              </Link>
              <button className="nav-logout" onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="nav-login"    onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="nav-register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Bottom row: navigation links */}
      <div className={`navbar-bottom ${menuOpen ? "open" : ""}`}>
        <div className="navbar-links">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
