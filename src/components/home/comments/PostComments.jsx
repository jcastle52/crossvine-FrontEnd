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
          <p>No comments</p>
        </div>
      );
    } else if (token && userData) {
      return (
        <div>
          <h2>All Comments</h2>
          {data.map((comment) => (
            <div key={comment.id}>
              <h3>{comment.user_owner}</h3>
              <p>{comment.comment}</p>
              {comment.user_owner === userData.username ? (<RemoveComment id={comment.id}/>) : (<></>)}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h2>All Comments</h2>
          {data.map((comment) => (
            <div key={comment.id}>
              <h3>{comment.user_owner}</h3>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}
