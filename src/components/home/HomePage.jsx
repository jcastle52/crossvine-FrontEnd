import SearchBar from "./SearchBar";
import Posts from "./Posts";
import HashtagsSidebar from "./hashtags/HashtagsSidebar";
import { useState } from "react";

//import Posts from "./Posts";
export default function HomePage() {
  const [searchArr, setSearchArr] = useState({
    date: "Newest",
    approval: null,
    type: null,
    search: "a e i o u y",
  });

  return (
    <>
      <SearchBar setSearchArr={setSearchArr} />
      <HashtagsSidebar setSearchArr={setSearchArr} />
      <Posts searchArr={searchArr} />
    </>
  );
}
