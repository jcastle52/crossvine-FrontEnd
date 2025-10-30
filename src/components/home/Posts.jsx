// import { useState, useEffect, useCallback } from "react";
// import { useApi } from "../../api/ApiContext";
// import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import useMutation from "../../api/useMutation";
import SaveHashtags from "./hashtags/SaveHashtags";
import LikesDislikes from "./approvals/LikesDislikes";

export default function Posts({ searchArr, setCommentPost }) {
  const {
    mutate,
    data: posts,
    error,
    loading,
  } = useMutation("POST", "/search", ["Posts"]);

  const getPosts = async () => {
    try {
      await mutate(searchArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [searchArr]);

  if (error)
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  if (loading)
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  if (posts) {
    return (
      <div className="posts-area">
        <div className="posts-section">
          <h1>Posts ({posts.length || 0})</h1>

          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-content">
                <h4>{post.title}</h4>

                {post.post_type === "Text" && (
                  <>
                    <p>
                      <strong>{post.user_owner}</strong>
                    </p>
                    <p>{post.description}</p>
                  </>
                )}

                {post.post_type === "Image" && (
                  <>
                    <p>
                      <strong>{post.user_owner}</strong>
                    </p>
                    <div className="post-media">
                      <img
                        className="post-image"
                        src={post.post_url}
                        alt={post.title}
                      />
                    </div>
                    <p>{post.description}</p>
                  </>
                )}

                {post.post_type === "YouTube" && (
                  <>
                    <p>
                      <strong>{post.user_owner}</strong>
                    </p>
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
                    <p>{post.description}</p>
                  </>
                )}

                <small>
                  Posted on {new Date(post.post_date).toLocaleDateString()}
                </small>

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
                  <LikesDislikes post={post} />
                </div>
              </div>
              <LikesDislikes post={post}/>
              <button onClick={() => setCommentPost(post)}>Comments</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

