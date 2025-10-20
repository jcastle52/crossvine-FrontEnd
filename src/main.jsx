import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ApiProvider } from "./api/ApiContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </AuthProvider>
);
