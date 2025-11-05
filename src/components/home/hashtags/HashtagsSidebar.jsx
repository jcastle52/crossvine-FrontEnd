import ThemeToggle from "../../theme/ThemeToggle";
import { useAuth } from "../../../auth/AuthContext";
import UserHashtags from "./UserHashtags";
import { useSearch } from "../../../contexts/SearchContext";

export default function HashtagsSidebar() {
  const { token } = useAuth();
  const { setSearchArr } = useSearch();
  const urlEndpoint = window.location.pathname
  
  const search = async (hashtag) => {
    if (setSearchArr) {
      const search = hashtag;
      let date = "Newest";
      let approval = "Likes";
      let type = null;
      try {
        setSearchArr({ date, approval, type, search });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
        {urlEndpoint === "/profile" || urlEndpoint === "/login" || urlEndpoint === "/register" ? <></> : <div className="hashtag-section">
          <h3>Trending Hashtags</h3>
          <div className="trending-hashtags">
            <span className="hashtag trending"
              onClick={setSearchArr ? () => search("#cars") : undefined}
              style={setSearchArr ? {} : { cursor: "default" }}>#cars</span>
            <span className="hashtag trending"
              onClick={setSearchArr ? () => search("#guitar") : undefined}
              style={setSearchArr ? {} : { cursor: "default" }}>#guitar</span>
              <span className="hashtag trending"
              onClick={setSearchArr ? () => search("#money") : undefined}
              style={setSearchArr ? {} : { cursor: "default" }}>#money</span>
              <span className="hashtag trending"
              onClick={setSearchArr ? () => search("#gym") : undefined}
              style={setSearchArr ? {} : { cursor: "default" }}>#gym</span>
          </div>
        </div>}
      </div>

      <ThemeToggle />
    </div>
  );
}
