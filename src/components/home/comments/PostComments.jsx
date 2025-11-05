import useQuery from "../../../api/useQuery";
import RemoveComment from "./RemoveComment";

import { useAuth } from "../../../auth/AuthContext";

export default function PostComments({ postId }) {
  const { token } = useAuth()
  const { data } = useQuery(`/comments/posts/${postId}`, "Comments");
  const { data: userData } = useQuery(`/users/profile`);
  if (data) {
    if (data.length === 0) {
      return (
        <div>
          <h2>All Comments</h2>
          <p style={{ fontStyle: 'italic', color: '#7f8c8d', textAlign: 'center' }}>No comments yet</p>
        </div>
      );
    } else if (token && userData) {
      return (
        <div>
          <h2>All Comments</h2>
          {data.map((comment) => (
            <div key={comment.id} className="comment-item">
              <h3>{comment.user_owner}</h3>
              <p>{comment.comment}</p>
              <small>{new Date(comment.post_date || comment.created_at).toLocaleString()}</small>
              {comment.user_owner === userData.username ? (
                <div style={{ marginTop: '8px' }}>
                  <RemoveComment id={comment.id}/>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h2>All Comments</h2>
          {data.map((comment) => (
            <div key={comment.id} className="comment-item">
              <h3>{comment.user_owner}</h3>
              <p>{comment.comment}</p>
              <small>{new Date(comment.post_date || comment.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      );
    }
  }
}
