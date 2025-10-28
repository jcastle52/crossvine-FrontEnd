import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./components/home/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import UsersPage from "./components/users/UsersPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users/:username" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}
