export default function HashtagsSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="hashtag-section">
          <h3>Saved Hashtags</h3>
          <div className="saved-hashtags">
            <p className="no-hashtags">Sign up to save hashtags!</p>
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

      <div className="theme-toggle-section">
        <div className="theme-toggle">
          <span className="theme-label">Theme</span>
          <div className="toggle-switch">
            <input type="checkbox" id="themeToggle" className="toggle-checkbox" />
            <label htmlFor="themeToggle" className="toggle-label">
              <span className="toggle-slider">
                <span className="toggle-icon light">☀️</span>
                <span className="toggle-icon dark">🌙</span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    
  )
}
