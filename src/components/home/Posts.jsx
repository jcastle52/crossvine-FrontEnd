import useQuery from "../../api/useQuery";
import useMutation from "../../api/useMutation";

export default function Posts() {
  const { data: posts, loading, error } = useQuery("/posts", "posts");
  const { mutate: likePost } = useMutation("POST", "/posts/like", ["posts"]);
  const { mutate: dislikePost } = useMutation("POST", "/posts/dislike", [
    "posts",
  ]);

  const handleLike = async (postId) => {
    try {
      await likePost({ postId });
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await dislikePost({ postId });
    } catch (err) {
      console.error("Error disliking post:", err);
    }
  };

  if (loading) {
    return (
      <div className="posts-feed">
        <h3>Posts</h3>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-feed">
        <h3>Posts</h3>
        <p style={{ color: "#e74c3c" }}>Error loading posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="posts-feed">
      <h3>Recent Posts</h3>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-content">
              <div className="post-header">
                <strong className="profile-link">
                  {post.user_owner || "Anonymous"}
                </strong>
                <small style={{ color: "#7f8c8d", marginLeft: "8px" }}>
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString()
                    : ""}
                </small>
              </div>

              {post.title && (
                <h4 style={{ margin: "8px 0 4px 0", color: "#2d5a3d" }}>
                  {post.title}
                </h4>
              )}

              {post.content && (
                <p style={{ margin: "4px 0 8px 0" }}>{post.content}</p>
              )}

              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#27ae60",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  🔗 {post.url}
                </a>
              )}
            </div>

            <div className="post-actions">
              <button className="like-btn" onClick={() => handleLike(post.id)}>
                👍 <span className="like-count">{post.likes || 0}</span>
              </button>
              <button
                className="dislike-btn"
                onClick={() => handleDislike(post.id)}
              >
                👎 <span className="dislike-count">{post.dislikes || 0}</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "#7f8c8d", fontStyle: "italic" }}>
          No posts yet. Be the first to share something!
        </p>
      )}
    </div>
  );
}
