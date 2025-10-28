import { useState } from "react";
import useMutation from "../../api/useMutation";

export default function ProfileCreate() {
  const { mutate } = useMutation("POST", "/posts/", ["userPosts", "userData"]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Creating post with data:", formData);
      await mutate(formData);
      console.log("Post created successfully!");
      setFormData({
        title: "",
        description: "",
        type: "",
      });
    } catch (error) {
      console.log("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-section">
      <h3>Create New Post</h3>
      <p className="register-subtitle">
        Share your thoughts with the community
      </p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postTitle">Post Title</label>
          <input
            type="text"
            id="postTitle"
            name="title"
            placeholder="Enter your post title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <small className="form-help">Give your post a catchy title</small>
        </div>

        <div className="form-group">
          <label htmlFor="postContent">Post Content</label>
          <textarea
            id="postContent"
            name="description"
            placeholder="What's on your mind?"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <small className="form-help">
            Share your thoughts, ideas, or experiences
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="postType">Post Type</label>
          <select
            id="postType"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select post type</option>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="YouTube">YouTube</option>
          </select>
          <small className="form-help">
            Choose the type of content you&apos;re sharing
          </small>
        </div>

        <button type="submit" className="register-btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
