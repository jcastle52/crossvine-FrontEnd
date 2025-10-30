import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useApi } from "../../api/ApiContext";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const { token } = useAuth();
  const { request } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Don't render if user is not logged in
  if (!token) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    // const currentUser = getCurrentUser();
    // if (!currentUser) {
    //   setError("Please log in to create posts");
    //   return;
    // }

    setIsSubmitting(true);
    setError("");

    try {
      const postData = {
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      await request("/posts", {
        method: "POST",
        body: JSON.stringify(postData),
      });

      // Clear form on success
      setContent("");

      // Refresh the page to show new post (temporary solution)
      window.location.reload();
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = content.length;
  const maxChars = 500;

  // Update character count color
  const getCharCountColor = () => {
    if (charCount > 450) return "#e74c3c";
    if (charCount > 400) return "#f39c12";
    return "#7f8c8d";
  };

  return (
    <div className="create-post-section">
      <h3>Create a New Post</h3>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder="What's on your mind? Share your thoughts, add hashtags..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxChars}
        />

        <div className="char-counter" style={{ color: getCharCountColor() }}>
          {charCount}/{maxChars}
        </div>

        <button
          type="submit"
          className="submit-post-btn"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>

        {error && (
          <div style={{ color: "#e74c3c", fontSize: "14px", marginTop: "8px" }}>
            Error: {error}
          </div>
        )}
      </form>
    </div>
  );
}
