import { Outlet } from "react-router";

import Navbar from "./Navbar";
import HashtagsSidebar from "../components/home/HashtagsSidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <HashtagsSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
