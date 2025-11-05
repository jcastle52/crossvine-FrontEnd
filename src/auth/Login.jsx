import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "./AuthContext";
import HashtagsSidebar from "../components/home/hashtags/HashtagsSidebar";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.username || !formData.password) {
      setError("Please fill in both username and password.");
      return;
    }

    console.log("Login form data:", {
      username: formData.username,
      password: "***",
    });

    setLoading(true);

    try {
      const credentials = {
        username: formData.username,
        password: formData.password
      }
      const result = await login(credentials);

      if (result) {
        console.log("Login successful");
        navigate("/"); // Redirect to home page
      } else {
        setError(
          result || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <HashtagsSidebar />
    <div className="register-layout">
      <div className="register-container">
        <h1 id="formTitle">Welcome Back</h1>
        <p className="register-subtitle" id="formSubtitle">
          Sign in to your Crossvine account
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div
              className="error-message"
              style={{ color: "#e74c3c", marginBottom: "10px" }}
            >
              {error}
            </div>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="login-link">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>

      <div className="logo-display">
        <img src="/IMG/LOGO.png" alt="Crossvine Logo" className="main-logo" />
      </div>
    </div>
    </>
  );
}
