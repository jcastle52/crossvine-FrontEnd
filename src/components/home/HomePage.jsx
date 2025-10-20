import CreatePost from "./CreatePost";
import Posts from "./Posts";

export default function HomePage() {
  return (
    <div className="profile-container">
      {/* Create Post Section */}
      <CreatePost />

      {/* Posts Section */}
      <div className="posts-area">
        <Posts />
      </div>
    </div>
  );
}
