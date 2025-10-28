import { useState } from "react";
import { Link } from "react-router";
import useQuery from "../../api/useQuery";
import { useApi } from "../../api/ApiContext";
import { useAuth } from "../../auth/AuthContext";

export default function Comments({ postId }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token } = useAuth();
  const { request, invalidateTags } = useApi();

  const {
    data: comments,
    error,
    loading,
  } = useQuery(`/comments/posts/${postId}`, `comments-${postId}`);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !token) return;

    setIsSubmitting(true);
    try {
      await request(`/comments/posts/${postId}`, {
        method: "POST",
        body: JSON.stringify({ comment: newComment.trim() }),
      });

      setNewComment("");
      invalidateTags([`comments-${postId}`]);
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await request(`/comments/${commentId}`, { method: "DELETE" });
      invalidateTags([`comments-${postId}`]);
      console.log("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const commentCount = comments?.length || 0;

  return (
    <div className="comments-section">
      <button
        onClick={() => setShowComments(!showComments)}
        className="comments-toggle"
        style={{
          background: "none",
          border: "none",
          color: "#2ecc71",
          cursor: "pointer",
          fontSize: "14px",
          padding: "5px 0",
        }}
      >
        💬 {commentCount} Comment{commentCount !== 1 ? "s" : ""}
        {showComments ? " ▼" : " ▶"}
      </button>

      {showComments && (
        <div
          className="comments-container"
          style={{
            marginTop: "15px",
            width: "calc(100% + 40px)",
            marginLeft: "-20px",
            marginRight: "-20px",
            boxSizing: "border-box",
          }}
        >
          {/* Add Comment Form */}
          {token && (
            <div
              className="comment-form-container"
              style={{
                marginBottom: "15px",
                width: "100%",
                paddingLeft: "20px",
                paddingRight: "20px",
                boxSizing: "border-box",
              }}
            >
              <form
                className="register-form"
                onSubmit={handleSubmitComment}
                style={{ width: "100%" }}
              >
                <div className="form-group" style={{ width: "100%" }}>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    disabled={isSubmitting}
                    style={{
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  <small className="form-help">
                    Share your thoughts on this post
                  </small>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="register-btn"
                  style={{
                    opacity: isSubmitting || !newComment.trim() ? 0.6 : 1,
                    width: "100%",
                  }}
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </form>
            </div>
          )}

          {/* Comments List */}
          <div
            className="comments-list"
            style={{
              width: "100%",
              paddingLeft: "20px",
              paddingRight: "20px",
              boxSizing: "border-box",
            }}
          >
            {loading && (
              <p
                style={{ color: "#666", fontStyle: "italic", fontSize: "14px" }}
              >
                Loading comments...
              </p>
            )}

            {error && (
              <p style={{ color: "#e74c3c", fontSize: "14px" }}>
                Error loading comments: {error}
              </p>
            )}

            {comments && comments.length > 0
              ? comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="post saved-post comment-box"
                    style={{
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div className="post-content" style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h3
                            className="post-title"
                            style={{ fontSize: "16px", margin: "0 0 8px 0" }}
                          >
                            <Link
                              to={`/users/${
                                comment.user_owner || comment.username
                              }`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                                cursor: "pointer",
                              }}
                            >
                              {comment.user_owner || comment.username}
                            </Link>
                          </h3>
                          <p
                            style={{
                              margin: "0 0 8px 0",
                              fontSize: "14px",
                              lineHeight: "1.4",
                            }}
                          >
                            {comment.comment}
                          </p>
                          <small style={{ color: "#666", fontSize: "12px" }}>
                            {new Date(
                              comment.post_date || comment.created_at
                            ).toLocaleString()}
                          </small>
                        </div>

                        {token &&
                          (() => {
                            try {
                              const payload = JSON.parse(
                                atob(token.split(".")[1])
                              );
                              return comment.user_owner === payload.username;
                            } catch {
                              return false;
                            }
                          })() && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              style={{
                                backgroundColor: "#e74c3c",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                cursor: "pointer",
                                marginLeft: "10px",
                              }}
                            >
                              Delete
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))
              : !loading &&
                !error && (
                  <p
                    style={{
                      color: "#666",
                      fontStyle: "italic",
                      fontSize: "14px",
                    }}
                  >
                    No comments yet.{" "}
                    {token
                      ? "Be the first to comment!"
                      : "Sign in to add a comment."}
                  </p>
                )}
          </div>
        </div>
      )}
    </div>
  );
}
