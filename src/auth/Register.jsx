import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
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
              action={onRegister}
            >
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username (e.g., @username)"
                  required
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
                  //required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter a secure password"
                  required
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
                />
                <small className="form-help">
                  Optional: Upload a profile picture (JPG, PNG, GIF)
                </small>
                <div className="image-preview" id="imagePreview"></div>
              </div>

              <div className="form-group" id="bioGroup">
                <label htmlFor="bio">Bio (Optional)</label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us a bit about yourself..."
                  rows="3"
                ></textarea>
                <small className="form-help">
                  Write a short bio to share with other users
                </small>
              </div>

              <button type="submit" className="register-btn" id="submitBtn">
                Create Account
              </button>
              {error && <output>{error}</output>}
            </form>

            <div className="login-link" id="toggleLink">
              <p>
                Already have an account?
                <Link to="/Login" onClick="toggleLoginRegister(event)">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <div className="logo-display">
            <img
              src="IMG/LOGO.png"
              alt="Crossvine Logo"
              className="main-logo"
            />
          </div>
        </div>
    </>
  );
}
