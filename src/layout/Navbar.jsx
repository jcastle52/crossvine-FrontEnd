import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar" className="topbar">
      <NavLink to="/" className="logo-link">
        <div className="logo-container">
          <img src="/IMG/smaller.png" alt="Logo" className="logo" />
          <span className="site-name">Crossvine</span>
        </div>
      </NavLink>

      <div className="search-container">
        <select
          className="search-type-dropdown"
          id="searchType"
          onChange="updateSearchPlaceholder()"
        >
          <option value="hashtag">🏷️ Hashtag</option>
          <option value="user">👤 User</option>
          <option value="keywords">🔍 Keywords</option>
        </select>
        <input
          type="text"
          className="search-bar"
          placeholder="Search hashtags..."
          id="searchInput"
        />
      </div>

      <nav className="nav-links">
        <NavLink to="/" className="nav-link">Home</NavLink>

        {token ? (
          <>
          <NavLink to="/" className="nav-link" id="loginToggle" onClick={() => logout()}>Logout</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
          </>
        ) : (
          <>
        <NavLink to="/login" className="nav-link" id="loginToggle">Login</NavLink>
        <NavLink to="/register" className="nav-link">Register</NavLink>
        </>
        )}
      </nav>
    </header>
  );
}

/*
        <div className="login-dropdown">
          <NavLink to="/login" className="nav-link" id="loginToggle">Login</NavLink>
          <div className="login-box" id="loginBox">
            <form className="login-form" onSubmit="handleLogin(event)">
              <div className="login-field">
                <input
                  type="text"
                  id="loginUsername"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="login-field">
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="login-submit-btn">Sign In</button>
            </form>
          </div>
        </div>
*/
