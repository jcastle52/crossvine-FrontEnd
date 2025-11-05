import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import useQuery from "../../api/useQuery";
//import RatioBar from "../profile/RatioBar";
import ProfileEdit from "../profile/ProfileEdit";

export default function ProfileSidebar() {
  const [isEditing, setIsEditing] = useState(false);

  // Calculate engagement stats
  const { data: user } = useQuery(`/users/profile`, "userData");
  const { token } = useAuth();

  // const totalLikes =
  //   posts?.reduce((sum, post) => sum + (post.likes || 0), 0) || 0;
  // const totalDislikes =
  //   posts?.reduce((sum, post) => sum + (post.dislikes || 0), 0) || 0;
  // const totalEngagement = totalLikes + totalDislikes;

  // const likesPercentage =
  //   totalEngagement > 0 ? (totalLikes / totalEngagement) * 100 : 50;
  // const dislikesPercentage =
  //   totalEngagement > 0 ? (totalDislikes / totalEngagement) * 100 : 50;
  if (!token)
    return (
      <>
        <div>
          <h1>Please sign in</h1>
        </div>
      </>
    );

  if (user)
    return (
      <div className="profile-sidebar">
        <div className="profile-username">{user.username || "Loading..."}</div>
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

        {/* Engagement Ratio Bar */}

        {/* Edit Profile Button */}
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

        {/* Profile Edit Modal */}
        {isEditing && (
          <ProfileEdit
            user={user}
            onSave={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    );
  else
    return (
      <>
        <h1>test</h1>
      </>
    );
}
