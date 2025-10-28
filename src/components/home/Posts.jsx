// import { useState, useEffect, useCallback } from "react";
// import { useApi } from "../../api/ApiContext";
// import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import useMutation from "../../api/useMutation";
import SaveHashtags from "./hashtags/SaveHashtags";
import LikesDislikes from "./interactions/LikesDislikes";

export default function Posts(props) {
  const { searchArr } = props;
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

          {posts.length === 0 && <p>You haven&apos;t posted anything yet.</p>}

          {posts.map((post) => (
            <div key={post.id}>
              <br />
              <h2>{post.title}</h2>
              <div>


                {post.post_type === "Text" ? (
                  <>
                    <h3>{post.user_owner}</h3>
                    <p>{post.description}</p>
                  </>
                ) : (
                  <></>
                )}


                {post.post_type === "Image" ? (
                  <>
                    <h3>{post.user_owner}</h3>
                    <img className="post-image" src={post.post_url}/>
                    <p>{post.description}</p>
                  </>
                ) : <></>}

                {post.post_type === "YouTube" ? (
                  <>
                    <h3>{post.user_owner}</h3>
                    <iframe width="512" height="312" src={post.post_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <p>{post.description}</p>
                  </>
                ) : <></>}

                <p>date: {post.post_date}</p>
                    {post.hashtags ? (
                      <>
                        {post.hashtags.map((hashtag, index) => (
                          <SaveHashtags key={index} hashtag={hashtag} />
                        ))}
                      </>
                    ) : <></>}
                <LikesDislikes post={post}/>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// export default function Posts() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { request } = useApi();
//   const { isLoggedIn } = useAuth();

//   const loadPosts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const result = await request("/posts");
//       setPosts(result.posts || []);
//     } catch (err) {
//       console.error("Error loading posts:", err);
//       setError(err.message || "Failed to load posts");
//     } finally {
//       setLoading(false);
//     }
//   }, [request]);

//   // Load posts on component mount
//   useEffect(() => {
//     loadPosts();
//   }, [loadPosts]);

//   const handleLike = async (postId) => {
//     if (!isLoggedIn()) {
//       alert("Please log in to like posts");
//       return;
//     }

//     try {
//       await request(`/posts/${postId}/like`, { method: "POST" });
//       // Reload posts to get updated counts
//       loadPosts();
//     } catch (err) {
//       console.error("Error liking post:", err);
//       alert("Failed to like post");
//     }
//   };

//   const handleDislike = async (postId) => {
//     if (!isLoggedIn()) {
//       alert("Please log in to dislike posts");
//       return;
//     }

//     try {
//       await request(`/posts/${postId}/dislike`, { method: "POST" });
//       // Reload posts to get updated counts
//       loadPosts();
//     } catch (err) {
//       console.error("Error disliking post:", err);
//       alert("Failed to dislike post");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="posts-feed">
//         <h3>Recent Posts</h3>
//         <p>Loading posts...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="posts-feed">
//         <h3>Recent Posts</h3>
//         <p style={{ color: "#e74c3c" }}>Error loading posts: {error}</p>
//         <button onClick={loadPosts} style={{ marginTop: "10px" }}>
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="posts-section">
//       <h3>Recent Posts</h3>
//       {posts && posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post.id} className="post saved-post">
//             <div className="post-content">
//               <p>
//                 <strong>
//                   <a href="#" className="profile-link">
//                     {post.authorUsername || post.user_owner || "Anonymous"}
//                   </a>
//                   :
//                 </strong>{" "}
//                 {post.content}
//               </p>

//               <div className="post-actions">
//                 <div className="vote-buttons">
//                   <button
//                     className="like-btn"
//                     onClick={() => handleLike(post.id)}
//                     disabled={!isLoggedIn()}
//                   >
//                     👍 <span className="like-count">{post.likes || 0}</span>
//                   </button>
//                   <button
//                     className="dislike-btn"
//                     onClick={() => handleDislike(post.id)}
//                     disabled={!isLoggedIn()}
//                   >
//                     👎{" "}
//                     <span className="dislike-count">{post.dislikes || 0}</span>
//                   </button>
//                 </div>
//               </div>

//               <small>
//                 {post.created_at
//                   ? new Date(post.created_at).toLocaleDateString()
//                   : post.timestamp
//                   ? new Date(post.timestamp).toLocaleDateString()
//                   : "Unknown date"}
//               </small>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="post saved-post no-posts-message">
//           <div className="post-content">
//             <p
//               style={{
//                 textAlign: "center",
//                 color: "#666",
//                 fontStyle: "italic",
//                 padding: "20px",
//               }}
//             >
//               No posts yet.{" "}
//               {isLoggedIn()
//                 ? "Share your first post above!"
//                 : "Sign in to create posts!"}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
