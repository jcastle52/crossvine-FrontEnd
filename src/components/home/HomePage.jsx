import SearchBar from "./SearchBar";
import Posts from "./Posts";
import ProfileCreate from "../profile/ProfileCreate";
import { useSearch } from "../../contexts/SearchContext";
import { useAuth } from "../../auth/AuthContext";
import HashtagsSidebar from "./hashtags/HashtagsSidebar";
import CommentsSidebar from "./comments/CommentsSidebar";
import { useState } from "react";

export default function HomePage() {
  const { searchArr, setSearchArr } = useSearch();
  const { token } = useAuth();
  const [commentPost, setCommentPost] = useState()

  return (
    <>
      <SearchBar setSearchArr={setSearchArr} searchArr={searchArr}/>
      {token && (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <ProfileCreate />
        </div>
      )}
      <HashtagsSidebar />
      <Posts searchArr={searchArr} setCommentPost={setCommentPost}/>
      {commentPost ? (
        <CommentsSidebar 
          post={commentPost} 
          onClose={() => setCommentPost(null)}
        />
      ) : null}
    </>
  );
}
