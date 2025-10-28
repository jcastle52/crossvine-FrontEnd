import { useAuth } from "../../auth/AuthContext";
import ProfileSidebar from "../home/ProfileSidebar";
import ProfilePosts from "./ProfilePosts";
import ProfileCreate from "./ProfileCreate";

export default function ProfilePage() {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>Please sign in</h1>
          <p>
            <a href="/login">Go to Login</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <ProfileCreate />
      <ProfilePosts />
      <ProfileSidebar />
    </div>
  );
}
//   if (!isLoggedIn()) {
//     return (
//       <div className="profile-container">
//         <div className="profile-header">
//           <p>
//             Please <a href="/login">login</a> to view your profile.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="profile-container">
//         <div className="profile-header">
//           <p>Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       {/* Create Post Section */}
//       <CreatePost />

//       {/* Posts Section */}
//       <div className="posts-area">
//         <div className="posts-section">
//           <h3>My Posts ({posts?.length || 0})</h3>

//           {posts && posts.length === 0 && (
//             <p>You haven&apos;t posted anything yet.</p>
//           )}

//           {posts &&
//             posts.map((post) => (
//               <div key={post.id} className="post">
//                 <div className="post-content">
//                   <p>{post.content}</p>
//                   <small>
//                     Posted on {new Date(post.createdAt).toLocaleDateString()}
//                   </small>

//                   {/* Post Media */}
//                   {post.media && post.media.length > 0 && (
//                     <div className="post-media">
//                       {post.media.map((item, index) => (
//                         <div key={index} className="media-item">
//                           {item.type === "image" && (
//                             <img
//                               src={item.url}
//                               alt={item.title || "Post image"}
//                               className="post-image"
//                             />
//                           )}
//                           {item.type === "video" && (
//                             <video controls className="post-video">
//                               <source src={item.url} type="video/mp4" />
//                             </video>
//                           )}
//                           {item.type === "youtube" && (
//                             <iframe
//                               src={item.url}
//                               frameBorder="0"
//                               allowFullScreen
//                               className="post-video"
//                             />
//                           )}
//                           {item.title && (
//                             <div className="media-title">{item.title}</div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Post Actions */}
//                   <div className="post-actions">
//                     <div className="vote-buttons">
//                       <span className="like-btn">👍 {post.likes || 0}</span>
//                       <span className="dislike-btn">
//                         👎 {post.dislikes || 0}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleDeletePost(post.id)}
//                   className="delete-post-btn"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Profile Sidebar - positioned independently */}
//       <ProfileSidebar user={user} posts={posts} />
//     </div>
//   );
// }
