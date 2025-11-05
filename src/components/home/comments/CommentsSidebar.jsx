import "./comments.css";
import PostComments from "./PostComments"
import CreateComment from "./CreateComment";
import { useAuth } from "../../../auth/AuthContext";

export default function CommentsSidebar({ post, onClose }) {
  const { token } = useAuth();
  
  return (
    <div className="comment-sidebar">
      <div className="comment-sidebar-header">
        <h1>{post.title}</h1>
        {onClose && (
          <button 
            className="close-sidebar-btn" 
            onClick={onClose}
            title="Close comments"
          >
            ✕
          </button>
        )}
      </div>
      
      {token ? (
        <CreateComment post={post}/>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '15px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#7f8c8d', margin: '0', fontSize: '14px' }}>
            Sign in to leave a comment
          </h3>
        </div>
      )}
      
      <PostComments postId={post.id} />
    </div>
  );
}
