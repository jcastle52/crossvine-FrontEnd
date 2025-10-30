import SearchBar from "./SearchBar";
import Posts from "./Posts";
import HashtagsSidebar from "./hashtags/HashtagsSidebar";
import CommentsSidebar from "./comments/CommentsSidebar";
import { useState } from "react";

//import Posts from "./Posts";
export default function HomePage() {
  const [searchArr, setSearchArr] = useState({
    date: "Newest",
    approval: "Likes",
    type: null,
    search: null,
  });

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
