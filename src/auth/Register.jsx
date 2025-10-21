import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    password: "",
    bio: "",
    profileImage: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Handle image preview
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setError("");

    // Basic validation
    if (!formData.username || !formData.fullname || !formData.password) {
      console.log("❌ Validation failed: missing required fields");
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      console.log("❌ Validation failed: password too short");
      setError("Password must be at least 6 characters long.");
      return;
    }

    console.log("✅ Validation passed, calling register...");
    setLoading(true);

    try {
      const result = await register(formData);

      if (result.success) {
        console.log("Registration successful");
        navigate("/"); // Redirect to home page
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-layout">
        <div className="register-container">
          <h1 id="formTitle">Join Crossvine</h1>
          <p className="register-subtitle" id="formSubtitle">
            Create your account to start sharing and saving hashtags
          </p>

          <form
            className="register-form"
            id="registerForm"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
              <small className="form-help">
                This will be your unique identifier on Crossvine
              </small>
            </div>

            <div className="form-group" id="fullnameGroup">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullname}
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
                placeholder="Enter a secure password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
              <small className="form-help" id="passwordHelp">
                Must be at least 6 characters long
              </small>
            </div>

            <div className="form-group" id="profileImageGroup">
              <label htmlFor="profileImage">Profile Image</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleInputChange}
                disabled={loading}
              />
              <small className="form-help">
                Optional: Upload a profile picture (JPG, PNG, GIF)
              </small>
              <div className="image-preview" id="imagePreview">
                {imagePreview && (
                  <img src={imagePreview} alt="Profile Preview" />
                )}
              </div>
            </div>

            <div className="form-group" id="bioGroup">
              <label htmlFor="bio">Bio (Optional)</label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Tell us a bit about yourself..."
                rows="3"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={loading}
              />
              <small className="form-help">
                Write a short bio to share with other users
              </small>
            </div>

            {error && (
              <div
                className="error-message"
                style={{ color: "#e74c3c", marginBottom: "10px" }}
              >
                {error}
              </div>
            )}

            <button
              type="button"
              className="register-btn"
              id="submitBtn"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="login-link" id="toggleLink">
            <p>
              Already have an account? <Link to="/login">Sign in here</Link>
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
