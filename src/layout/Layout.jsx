import { Outlet } from "react-router";

import Navbar from "./Navbar";
import HashtagsSidebar from "../components/home/hashtags/HashtagsSidebar";
import { SearchProvider } from "../contexts/SearchContext";

export default function Layout() {
  return (
    <SearchProvider>
      <Navbar />
      <HashtagsSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </SearchProvider>
  );
}
