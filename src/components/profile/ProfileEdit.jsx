import { useState } from "react";
import { useApi } from "../../api/ApiContext";
import { useAuth } from "../../auth/AuthContext";
import "./ProfileEdit.css";

export default function ProfileEdit({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    profileName: user?.profile_name || "",
    bio: user?.bio || "",
    profileImage: user?.thumbnail_url || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { request, invalidateTags } = useApi();
  const { token } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    setIsSubmitting(true);
    setError("");

    try {
      await request("/users/profile", {
        method: "PUT",
        body: JSON.stringify({
          profileName: formData.profileName,
          profileImage: formData.profileImage,
          bio: formData.bio,
        }),
      });

      // Invalidate cache to refresh profile data
      invalidateTags(["userData", "userPosts"]);

      console.log("Profile updated successfully!");
      onSave();
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-edit-overlay">
      <div className="profile-edit-modal">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="profileName">Display Name</label>
            <input
              type="text"
              id="profileName"
              name="profileName"
              placeholder="Enter your display name"
              value={formData.profileName}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <small className="form-help">
              This is how your name will appear to other users
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image URL</label>
            <input
              type="url"
              id="profileImage"
              name="profileImage"
              placeholder="Enter image URL (optional)"
              value={formData.profileImage}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <small className="form-help">
              Paste a link to your profile picture
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              rows="4"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <small className="form-help">
              Share a bit about yourself with other users
            </small>
          </div>

          {error && <div className="profile-edit-error">{error}</div>}

          <div className="profile-edit-buttons">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="profile-edit-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`register-btn profile-edit-submit ${
                isSubmitting ? "disabled" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
