import { Outlet } from "react-router";

import Navbar from "./Navbar";
//import HashtagsSidebar from "../components/home/HashtagsSidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
