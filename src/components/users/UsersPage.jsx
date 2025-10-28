import { useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import useQuery from "../../api/useQuery";
import Comments from "../comments/Comments";
import LikeDislike from "../interactions/LikeDislike";
import RatioBar from "../profile/RatioBar";
import ProfileEdit from "../profile/ProfileEdit";

export default function UsersPage() {
  const { username } = useParams();
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: user,
    error,
    loading,
  } = useQuery(`/users/${username}`, `user-${username}`);

  // Check if user is viewing their own profile
  const isOwnProfile =
    token &&
    (() => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.username === username;
      } catch {
        return false;
      }
    })();

  if (loading)
    return (
      <div className="user-profile-container">
        <h1>Loading {username}&apos;s profile...</h1>
      </div>
    );

  if (error)
    return (
      <div className="user-profile-container">
        <h1>Error loading profile: {error}</h1>
      </div>
    );

  if (!user)
    return (
      <div className="user-profile-container">
        <h1>User {username} not found</h1>
      </div>
    );

  const posts = user.posts || [];

  return (
    <div className="profile-container">
      {/* Main Content Area - Posts */}
      <div className="posts-area">
        <div className="posts-section">
          <h3>
            {user.username}&apos;s Posts ({posts.length})
          </h3>

          {posts.length === 0 && (
            <p>{user.username} hasn&apos;t posted anything yet.</p>
          )}

          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-content">
                <h4 style={{ color: "#27ae60" }}>{post.title}</h4>
                {post.post_type === "Text" ? (
                  <>
                    <p>{post.description}</p>
                    <small>
                      Posted on {new Date(post.post_date).toLocaleDateString()}
                    </small>
                  </>
                ) : (
                  <>
                    <p>Post type: {post.post_type}</p>
                    {post.post_URL && (
                      <a
                        href={post.post_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Media
                      </a>
                    )}
                  </>
                )}

                <div className="post-actions">
                  <LikeDislike
                    postId={post.id}
                    initialLikes={post.likes || 0}
                    initialDislikes={post.dislikes || 0}
                  />
                </div>

                {/* Comments Section */}
                <Comments postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-username">{user.username}</div>
        <div className="profile-displayname">{user.profile_name || ""}</div>

        <img
          src={user.thumbnail_url || "/IMG/default-avatar.png"}
          alt="Profile"
          className="profile-picture"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%2327ae60'/%3E%3Ctext x='60' y='75' text-anchor='middle' fill='white' font-size='48' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E";
          }}
        />

        <div className="profile-bio">{user.bio || "No bio available"}</div>

        {/* Edit Profile Button - Only show for own profile */}
        {isOwnProfile && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            ✏️ Edit Profile
          </button>
        )}

        {/* Engagement Ratio Bar */}
        <RatioBar username={user.username} />

        {/* Profile Edit Modal */}
        {isEditing && (
          <ProfileEdit
            user={user}
            onSave={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
}
