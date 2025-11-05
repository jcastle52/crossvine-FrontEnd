import { Outlet } from "react-router";

import Navbar from "./Navbar";
import { SearchProvider } from "../contexts/SearchContext";

export default function Layout() {
  return (
    <SearchProvider>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </SearchProvider>
  );
}
