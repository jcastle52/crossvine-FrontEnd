// import { useState, useEffect, useCallback } from "react";
// import { useApi } from "../../api/ApiContext";
// import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import useMutation from "../../api/useMutation";
import SaveHashtags from "./hashtags/SaveHashtags";
import LikeDislike from "../interactions/LikeDislike";
import { useNavigate } from "react-router";

export default function Posts({ searchArr, setCommentPost }) {
  const {
    mutate,
    data: posts,
    error,
    loading,
  } = useMutation("POST", "/search", ["Posts"]);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        await mutate(searchArr);
      } catch (error) {
        console.log(error);
      }
    };
    
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchArr]);

  if (error) {
    return (
      <div className="posts-area">
        <div className="posts-section">
          <h3>Posts</h3>
          <p style={{ color: "#e74c3c", textAlign: "center", padding: "20px" }}>
            Error loading posts: {error}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="posts-area">
        <div className="posts-section">
          <h3>Posts</h3>
          <p style={{ textAlign: "center", padding: "20px", color: "#7f8c8d" }}>
            Loading posts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-area">
      <div className="posts-section">
        <h3>Posts ({posts?.length || 0})</h3>

        {!posts || posts.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#7f8c8d", fontStyle: "italic" }}>
            No posts found. Try adjusting your search criteria.
          </p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-content">
                <h4 style={{ color: "#27ae60" }}>{post.title}</h4>
                <p>
                  <strong  style={{ 
          color: '#ffffffff',
          background: 'none', 
          border: 'none', 
          fontSize: '18px', 
          cursor: 'pointer' 
        }} onClick={() => navigate(`/users/${post.user_owner}`)}>{post.user_owner}</strong>
                </p>

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
                    {post.post_url && (
                      <>
                        {post.post_type === "Image" && (
                          <div className="post-media">
                            <img
                              className="post-image"
                              src={post.post_url}
                              alt={post.title}
                            />
                          </div>
                        )}
                        {post.post_type === "YouTube" && (
                          <div className="post-media">
                            <iframe
                              width="100%"
                              height="315"
                              src={post.post_url}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              style={{ maxWidth: "560px", borderRadius: "8px" }}
                            />
                          </div>
                        )}
                        {post.post_type !== "Image" && post.post_type !== "YouTube" && (
                          <a
                            href={post.post_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Media
                          </a>
                        )}
                      </>
                    )}
                    <p>{post.description}</p>
                    <small>
                      Posted on {new Date(post.post_date).toLocaleDateString()}
                    </small>
                  </>
                )}

                {post.hashtags && post.hashtags.length > 0 && (
                  <div
                    className="hashtag-container"
                    style={{
                      margin: "10px 0",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {post.hashtags.map((hashtag, index) => (
                      <SaveHashtags key={index} hashtag={hashtag} />
                    ))}
                  </div>
                )}

                <div className="post-actions">
                  <LikeDislike
                    postId={post.id}
                    initialLikes={post.likes || 0}
                    initialDislikes={post.dislikes || 0}
                  />
                  <button
                    onClick={() => setCommentPost(post)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#3498db",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    💬 Comments
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

