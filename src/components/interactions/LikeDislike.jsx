import { useState, useEffect } from "react";
import { useApi } from "../../api/ApiContext";
import { useAuth } from "../../auth/AuthContext";

export default function LikeDislike({
  postId,
  initialLikes = 0,
  initialDislikes = 0,
  onUpdate,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userVote, setUserVote] = useState(null); // null, true (like), false (dislike)
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();
  const { request } = useApi();

  // Fetch user's current vote when component mounts
  useEffect(() => {
    const fetchUserVote = async () => {
      try {
        const response = await request(`/approvals/${postId}`);
        setUserVote(response.approve);
      } catch {
        // User hasn't voted yet, that's fine
        console.log("No existing vote found");
      }
    };

    if (token && postId) {
      fetchUserVote();
    }
  }, [postId, token, request]);

  const handleVote = async (isLike) => {
    if (!token) {
      alert("Please log in to vote");
      return;
    }

    setIsLoading(true);

    try {
      // If user is clicking the same vote they already made, remove it
      if (userVote === isLike) {
        await request(`/approvals/${postId}`, { method: "DELETE" });

        // Update local counts
        if (isLike) {
          setLikes((prev) => prev - 1);
        } else {
          setDislikes((prev) => prev - 1);
        }
        setUserVote(null);
      }
      // If user has no vote, create new vote
      else if (userVote === null) {
        await request(`/approvals/${postId}`, {
          method: "POST",
          body: JSON.stringify({ approval: isLike }),
        });

        // Update local counts
        if (isLike) {
          setLikes((prev) => prev + 1);
        } else {
          setDislikes((prev) => prev + 1);
        }
        setUserVote(isLike);
      }
      // If user is changing their vote
      else {
        await request(`/approvals/${postId}`, {
          method: "PUT",
          body: JSON.stringify({ approval: isLike }),
        });

        // Update local counts (remove old vote, add new vote)
        if (isLike) {
          setLikes((prev) => prev + 1);
          setDislikes((prev) => prev - 1);
        } else {
          setDislikes((prev) => prev + 1);
          setLikes((prev) => prev - 1);
        }
        setUserVote(isLike);
      }

      // Notify parent component of the update if callback provided
      if (onUpdate) {
        onUpdate({ likes: likes, dislikes: dislikes });
      }
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to submit vote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vote-buttons">
      <button
        className={`like-btn ${userVote === true ? "active" : ""}`}
        onClick={() => handleVote(true)}
        disabled={isLoading}
        style={{
          backgroundColor: userVote === true ? "#27ae60" : "transparent",
          color: userVote === true ? "white" : "#27ae60",
          border: `1px solid #27ae60`,
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
          marginRight: "8px",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        👍 {likes}
      </button>
      <button
        className={`dislike-btn ${userVote === false ? "active" : ""}`}
        onClick={() => handleVote(false)}
        disabled={isLoading}
        style={{
          backgroundColor: userVote === false ? "#e74c3c" : "transparent",
          color: userVote === false ? "white" : "#e74c3c",
          border: `1px solid #e74c3c`,
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        👎 {dislikes}
      </button>
    </div>
  );
}
