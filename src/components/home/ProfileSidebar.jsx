export default function ProfileSidebar({ user, posts }) {
  // Calculate engagement stats
  const totalLikes =
    posts?.reduce((sum, post) => sum + (post.likes || 0), 0) || 0;
  const totalDislikes =
    posts?.reduce((sum, post) => sum + (post.dislikes || 0), 0) || 0;
  const totalEngagement = totalLikes + totalDislikes;

  const likesPercentage =
    totalEngagement > 0 ? (totalLikes / totalEngagement) * 100 : 50;
  const dislikesPercentage =
    totalEngagement > 0 ? (totalDislikes / totalEngagement) * 100 : 50;

  return (
    <div className="profile-sidebar">
      <div className="profile-username">{user?.username || "Loading..."}</div>
      <div className="profile-displayname">{user?.displayName || ""}</div>

      <img
        src={user?.profilePicture || "/IMG/default-avatar.png"}
        alt="Profile"
        className="profile-picture"
        onError={(e) => {
          e.target.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%2327ae60'/%3E%3Ctext x='60' y='75' text-anchor='middle' fill='white' font-size='48' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E";
        }}
      />

      <div className="profile-bio">{user?.bio || "No bio available"}</div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">{posts?.length || 0}</span>
          <span className="stat-label">Posts</span>
        </div>
      </div>

      <div className="engagement-section">
        <div className="engagement-title">Engagement Ratio</div>
        <div className="ratio-bar">
          <div
            className="ratio-likes"
            style={{ width: `${likesPercentage}%` }}
          ></div>
          <div
            className="ratio-dislikes"
            style={{ width: `${dislikesPercentage}%` }}
          ></div>
        </div>
        <div className="ratio-labels">
          <span className="likes-label">{totalLikes} Likes</span>
          <span className="dislikes-label">{totalDislikes} Dislikes</span>
        </div>
      </div>
    </div>
  );
}
