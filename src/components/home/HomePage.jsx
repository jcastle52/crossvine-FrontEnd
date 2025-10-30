import SearchBar from "./SearchBar";
import Posts from "./Posts";
import { useSearch } from "../../contexts/SearchContext";
import HashtagsSidebar from "./hashtags/HashtagsSidebar";
import CommentsSidebar from "./comments/CommentsSidebar";
import { useState } from "react";

export default function HomePage() {
  const { searchArr, setSearchArr } = useSearch();

  const [commentPost, setCommentPost] = useState()

  return (
    <>
      <SearchBar setSearchArr={setSearchArr} searchArr={searchArr}/>
      <HashtagsSidebar setSearchArr={setSearchArr} />
      <Posts searchArr={searchArr} setCommentPost={setCommentPost}/>
      {commentPost ? <CommentsSidebar post={commentPost}/> : <></>}
    </>
  );
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
