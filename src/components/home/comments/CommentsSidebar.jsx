import "./comments.css";
import PostComments from "./PostComments"
import CreateComment from "./CreateComment";
import { useAuth } from "../../../auth/AuthContext";
export default function CommentsSidebar({ post }) {
const { token } = useAuth();
  return (
    <div className="comment-sidebar">
        <h1>{post.title}</h1>
      <PostComments postId={post.id} />
      {token ? <CreateComment post={post}/> : <><h3>Sign in to leave a comment</h3></>}
    </div>
  );
}
