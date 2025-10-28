import useQuery from "../../api/useQuery";
import { useApi } from "../../api/ApiContext";
import Comments from "../comments/Comments";
import LikeDislike from "../interactions/LikeDislike";

export default function ProfilePosts() {
  const {
    data: user,
    error,
    loading,
  } = useQuery(`/users/profile`, "userPosts");

  const { request, invalidateTags } = useApi();

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await request(`/posts/${postId}`, { method: "DELETE" });
        invalidateTags(["userPosts"]);
        console.log("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again.");
      }
    }
  };

  if (error)
    return (
      <div style={{ border: "2px solid red", padding: "10px" }}>
        <h1>Error: {error}</h1>
      </div>
    );

  if (loading)
    return (
      <div style={{ border: "2px solid orange", padding: "10px" }}>
        <h1>Loading Posts...</h1>
      </div>
    );

  if (!user)
    return (
      <div style={{ border: "2px solid purple", padding: "10px" }}>
        <h1>Backend not responding - No user data</h1>
      </div>
    );
  if (user) {
    const posts = user.posts || [];
    console.log("ProfilePosts - User data:", user);
    console.log("ProfilePosts - Posts count:", posts.length);
    return (
      <div className="posts-area">
        <div className="posts-section">
          <h3>My Posts ({posts.length || 0})</h3>

          {posts.length === 0 && <p>You haven&apos;t posted anything yet.</p>}

          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-content">
                <h4 style={{ color: "#27ae60" }}>{post.title}</h4>
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
                    {post.post_URL && (
                      <a
                        href={post.post_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Media
                      </a>
                    )}
                  </>
                )}

                <div className="post-actions">
                  <LikeDislike
                    postId={post.id}
                    initialLikes={post.likes || 0}
                    initialDislikes={post.dislikes || 0}
                  />
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="delete-post-btn"
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </div>

                {/* Comments Section */}
                <Comments postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// {posts &&
//     posts.map((post) => (
//       <div key={post.id} className="post">
//         <div className="post-content">
//           <p>{post.description}</p>
//           <small>
//             Posted on {new Date(post.createdAt).toLocaleDateString()}
//           </small>

//           {/* Post Media*/}
//           {post.media && post.media.length > 0 && (
//             <div className="post-media">
//               {post.media.map((item, index) => (
//                 <div key={index} className="media-item">
//                   {item.type === "image" && (
//                     <img
//                       src={item.url}
//                       alt={item.title || "Post image"}
//                       className="post-image"
//                     />
//                   )}
//                   {item.type === "video" && (
//                     <video controls className="post-video">
//                       <source src={item.url} type="video/mp4" />
//                     </video>
//                   )}
//                   {item.type === "youtube" && (
//                     <iframe
//                       src={item.url}
//                       frameBorder="0"
//                       allowFullScreen
//                       className="post-video"
//                     />
//                   )}
//                   {item.title && (
//                     <div className="media-title">{item.title}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Post Actions */}
//           <div className="post-actions">
//             <div className="vote-buttons">
//               <span className="like-btn">👍 {post.likes || 0}</span>
//               <span className="dislike-btn">
//                 👎 {post.dislikes || 0}
//               </span>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={() => handleDeletePost(post.id)}
//           className="delete-post-btn"
//         >
//           Delete
//         </button>
//       </div>
//     ))}
