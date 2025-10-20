import { useAuth } from "../../hooks/useAuth";
import ProfileSidebar from "../home/ProfileSidebar";
import CreatePost from "../home/CreatePost";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { user: authUser, isLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and use auth user data
    setLoading(true);

    setTimeout(() => {
      if (authUser) {
        setUser({
          username: authUser.username || "Username",
          displayName: authUser.fullname || authUser.username || "Display Name",
          bio: authUser.bio || "No bio added yet.",
          profilePicture: null, // Will use default fallback
        });

        // Mock some posts for demonstration
        setPosts([
          {
            id: 1,
            content:
              "Welcome to my profile! This is my first post on Crossvine.",
            createdAt: new Date().toISOString(),
            likes: 5,
            dislikes: 0,
            media: [],
          },
          {
            id: 2,
            content: "Testing out the platform features. Looking good so far!",
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            likes: 12,
            dislikes: 1,
            media: [],
          },
        ]);
      } else {
        setUser(null);
        setPosts([]);
      }
      setLoading(false);
    }, 500);
  }, [authUser]);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  if (!isLoggedIn()) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <p>
            Please <a href="/login">login</a> to view your profile.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Create Post Section */}
      <CreatePost />

      {/* Posts Section */}
      <div className="posts-area">
        <div className="posts-section">
          <h3>My Posts ({posts?.length || 0})</h3>

          {posts && posts.length === 0 && (
            <p>You haven&apos;t posted anything yet.</p>
          )}

          {posts &&
            posts.map((post) => (
              <div key={post.id} className="post">
                <div className="post-content">
                  <p>{post.content}</p>
                  <small>
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </small>

                  {/* Post Media */}
                  {post.media && post.media.length > 0 && (
                    <div className="post-media">
                      {post.media.map((item, index) => (
                        <div key={index} className="media-item">
                          {item.type === "image" && (
                            <img
                              src={item.url}
                              alt={item.title || "Post image"}
                              className="post-image"
                            />
                          )}
                          {item.type === "video" && (
                            <video controls className="post-video">
                              <source src={item.url} type="video/mp4" />
                            </video>
                          )}
                          {item.type === "youtube" && (
                            <iframe
                              src={item.url}
                              frameBorder="0"
                              allowFullScreen
                              className="post-video"
                            />
                          )}
                          {item.title && (
                            <div className="media-title">{item.title}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="post-actions">
                    <div className="vote-buttons">
                      <span className="like-btn">👍 {post.likes || 0}</span>
                      <span className="dislike-btn">
                        👎 {post.dislikes || 0}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="delete-post-btn"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Profile Sidebar - positioned independently */}
      <ProfileSidebar user={user} posts={posts} />
    </div>
  );
}
