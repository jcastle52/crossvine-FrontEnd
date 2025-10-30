import ThemeToggle from "../../theme/ThemeToggle";
import { useAuth } from "../../../auth/AuthContext";
import UserHashtags from "./UserHashtags";

export default function HashtagsSidebar() {
  const { token } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="hashtag-section">
          <h3>Saved Hashtags</h3>
          <div className="saved-hashtags">
            {token ? (
              <>
                <UserHashtags />
              </>
            ) : (
              <>
                <p className="no-hashtags">
                  Sign up or login to save hashtags!
                </p>
              </>
            )}
          </div>
        </div>
        <div className="hashtag-section">
          <h3>Trending Hashtags</h3>
          <div className="trending-hashtags">
            <span className="hashtag trending">#viral</span>
            <span className="hashtag trending">#news</span>
            <span className="hashtag trending">#trending</span>
            <span className="hashtag trending">#popular</span>
          </div>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
}
