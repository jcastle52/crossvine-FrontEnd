import useQuery from "../../api/useQuery";

export default function ProfilePosts(user) {
  const { data: posts, error, loading } = useQuery(`/users/${user.username}/posts`, "userPosts");

  if (error) return (
    <>
        <h1>{error}</h1>
    </>
  )
  if (loading) return (
    <>
        <h1>Loading</h1>
    </>
  )
  if (posts)
    return (
      <div className="posts-area">
        <div className="posts-section">
          <h3>My Posts ({posts.length || 0})</h3>

          {posts.length === 0 && (
            <p>You haven&apos;t posted anything yet.</p>
          )}
        
          {posts.map((post) => (
            <div key={post.id}>
            <h1>{post.title}</h1>
                <div>
                    {post.post_type === "Text" ? (
                        <>
                            <p>{post.description}</p>
                            <p>{post.post_date}</p>
                        </>
                    ) : (
                        <>
                        <h1>Not a text</h1>
                        </>
                    )}
                </div>
            </div>
          ))}
        </div>
      </div>
    );
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