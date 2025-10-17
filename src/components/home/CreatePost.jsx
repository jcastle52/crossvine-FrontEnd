import { useState } from "react";
import useMutation from "../../api/useMutation";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const {
    mutate: createPost,
    loading,
    error,
  } = useMutation("POST", "/posts", ["posts"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() && !content.trim()) {
      return;
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      url: url.trim() || null,
    };

    try {
      await createPost(postData);
      setTitle("");
      setContent("");
      setUrl("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const charCount = content.length;
  const maxChars = 500;

  return (
    <div className="create-post-section">
      <h3>Create a New Post</h3>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="post-url-input"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />

        <textarea
          className="post-textarea"
          placeholder="What's on your mind? Share your thoughts, add hashtags..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxChars}
        />

        <input
          type="url"
          className="post-url-input"
          placeholder="Add a link (optional)..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="char-counter">
          {charCount}/{maxChars} characters
        </div>

        <button
          type="submit"
          className="submit-post-btn"
          disabled={loading || (!title.trim() && !content.trim())}
        >
          {loading ? "Posting..." : "Post"}
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
