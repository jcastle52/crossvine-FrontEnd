import HashtagSidebar from "./HashtagsSidebar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

export default function HomePage() {
  return (
    <>
      <HashtagSidebar />
      <main className="main-content">
        <CreatePost />
        <Posts />
      </main>
    </>
  );
}
