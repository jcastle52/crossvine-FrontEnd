import { useState, useEffect } from "react";
import useQuery from "../../api/useQuery";

export default function RatioBar({ username }) {
  const [ratioPercentage, setRatioPercentage] = useState(50);

  const {
    data: stats,
    loading,
    error,
  } = useQuery(`/users/${username}/stats`, `user-stats-${username}`);

  useEffect(() => {
    if (stats) {
      const totalVotes =
        parseInt(stats.total_likes) + parseInt(stats.total_dislikes);
      if (totalVotes > 0) {
        const likePercentage = (parseInt(stats.total_likes) / totalVotes) * 100;
        setRatioPercentage(likePercentage);
      } else {
        setRatioPercentage(50); //Default
      }
    }
  }, [stats]);

  if (loading || error || !stats) {
    return null; 
  }

  const totalVotes =
    parseInt(stats.total_likes) + parseInt(stats.total_dislikes);

  return (
    <div style={{ marginTop: "15px" }}>
      <h3
        style={{
          fontSize: "16px",
          marginBottom: "15px",
          textAlign: "center",
          color: "#2ecc71",
        }}
      >
        Engagement Statistics
      </h3>

      {/* Stats Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          padding: "8px 12px",
          backgroundColor: "rgba(52, 152, 219, 0.1)",
          borderRadius: "8px",
          border: "1px solid rgba(52, 152, 219, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "16px" }}>👍</span>
          <span
            style={{ fontSize: "14px", fontWeight: "bold", color: "#27ae60" }}
          >
            {stats.total_likes}
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>
            Like Ratio
          </div>
          <div
            style={{ fontSize: "14px", fontWeight: "bold", color: "#2c3e50" }}
          >
            {ratioPercentage.toFixed(1)}%
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "16px" }}>👎</span>
          <span
            style={{ fontSize: "14px", fontWeight: "bold", color: "#e74c3c" }}
          >
            {stats.total_dislikes}
          </span>
        </div>
      </div>

      {/* Ratio Bar */}
      <div
        className="ratio-bar-track"
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#ecf0f1",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          border: "2px solid #bdc3c7",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Dislike background */}
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            width: `${100 - ratioPercentage}%`,
            height: "100%",
            backgroundColor: "#e74c3c",
            transition: "width 0.3s ease",
          }}
        />

        {/* Like fill */}
        <div
          className="ratio-bar-fill"
          style={{
            width: `${ratioPercentage}%`,
            height: "100%",
            backgroundColor: "#27ae60",
            transition: "width 0.3s ease",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Bottom Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "12px",
          padding: "8px 0",
          borderTop: "1px solid #ecf0f1",
        }}
      >
        <span style={{ fontSize: "12px", color: "#7f8c8d", fontWeight: "500" }}>
          {totalVotes} total vote{totalVotes !== 1 ? "s" : ""}
        </span>

        {stats.total_posts && (
          <span
            style={{ fontSize: "12px", color: "#7f8c8d", fontWeight: "500" }}
          >
            {stats.total_posts} post
            {parseInt(stats.total_posts) !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}
