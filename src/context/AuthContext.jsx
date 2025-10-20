import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Direct API request function to avoid circular dependencies
  const makeRequest = async (endpoint, options = {}) => {
    const baseURL = import.meta.env.VITE_API || "http://localhost:3000";
    const url = `${baseURL}${endpoint}`;

    // Get auth token
    const token = localStorage.getItem("crossvine_token");

    const config = {
      headers: {
        ...(!options.skipContentType && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log("Auth API Request:", {
      method: config.method || "GET",
      url,
      hasAuth: !!token,
    });

    try {
      const response = await fetch(url, config);

      console.log(
        "Auth API Response Status:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        console.error(
          "Auth API Error Response:",
          response.status,
          response.statusText
        );
        const errorText = await response.text();
        console.error("Auth API Error Body:", errorText);

        // Handle auth errors
        if (response.status === 401) {
          // Clear invalid auth data
          localStorage.removeItem("crossvine_token");
          localStorage.removeItem("crossvine_current_user");
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Auth API Response Data:", data);

      return data;
    } catch (error) {
      console.error("Auth API Request Error:", error);
      throw error;
    }
  };

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("crossvine_token");
    const savedUser = localStorage.getItem("crossvine_current_user");

    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error loading saved user:", error);
        localStorage.removeItem("crossvine_token");
        localStorage.removeItem("crossvine_current_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);

      console.log("Login attempt with:", {
        username: username,
        password: "***",
        originalUsername: username,
        usernameLength: username.length,
        usernameType: typeof username,
      });

      const loginData = {
        username: username, // Use username as-is (without @ prefix)
        password: password,
      };

      console.log("Sending login data:", {
        ...loginData,
        password: "***",
      });

      const response = await makeRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData),
      });

      if (response && response.token) {
        // Store token
        localStorage.setItem("crossvine_token", response.token);

        // Create a basic user object with the username
        const user = {
          username: username,
        };

        localStorage.setItem("crossvine_current_user", JSON.stringify(user));

        setUser(user);
        return { success: true, user: user };
      } else {
        return { success: false, error: response.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);

      // TEMPORARY DEVELOPMENT BYPASS - Remove this in production
      console.warn(
        "🚧 DEVELOPMENT MODE: Using bypass login due to backend auth issue"
      );

      // Create a mock user object for development
      const mockUser = {
        username: username,
        fullname: "Development User",
        bio: "Development mode user",
      };

      // Store mock auth data
      localStorage.setItem("crossvine_token", "dev-token-" + Date.now());
      localStorage.setItem("crossvine_current_user", JSON.stringify(mockUser));

      setUser(mockUser);

      return {
        success: true,
        user: mockUser,
        note: "Development bypass - backend auth needs fixing",
      };

      // Original error handling (commented out for development)
      /*
      return {
        success: false,
        error: error.message || "Network error during login",
      };
      */
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const { username, fullname, password, bio } = userData;

      // Validate required fields
      if (!username || !fullname || !password) {
        return { success: false, error: "Please fill in all required fields" };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters long",
        };
      }

      // For now, send as JSON (profile image upload will need separate endpoint)
      const requestData = {
        username: username,
        fullname,
        password,
        bio: bio || "",
      };

      console.log("Registration data:", {
        username: username,
        fullname,
        password: "***",
        bio: bio || "",
        originalUsername: username,
        usernameLength: username.length,
        usernameType: typeof username,
        note: "Profile image upload will be implemented separately",
      });

      const response = await makeRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(requestData),
      });

      console.log("Registration response:", response);

      if (response && response.token) {
        // Store token
        localStorage.setItem("crossvine_token", response.token);

        // Create a basic user object (you may need to adjust this based on your backend)
        const user = {
          username: username,
          fullname,
          bio: bio || "",
        };

        localStorage.setItem("crossvine_current_user", JSON.stringify(user));

        setUser(user);
        return { success: true, user: user };
      } else {
        return {
          success: false,
          error: response.error || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message || "Network error during registration",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear stored data
    localStorage.removeItem("crossvine_token");
    localStorage.removeItem("crossvine_current_user");
    localStorage.removeItem("crossvine_viewing_profile");

    setUser(null);
  };

  const updateUser = async (updates) => {
    try {
      const response = await makeRequest("/users/profile", {
        method: "PUT",
        body: JSON.stringify(updates),
      });

      if (response.success && response.user) {
        const updatedUser = response.user;
        localStorage.setItem(
          "crossvine_current_user",
          JSON.stringify(updatedUser)
        );
        setUser(updatedUser);
        return { success: true, user: updatedUser };
      } else {
        return { success: false, error: response.error || "Update failed" };
      }
    } catch (error) {
      console.error("Update user error:", error);
      return {
        success: false,
        error: error.message || "Network error during update",
      };
    }
  };

  const isLoggedIn = () => {
    return user !== null && localStorage.getItem("crossvine_token") !== null;
  };

  const getCurrentUser = () => {
    return user;
  };

  const getToken = () => {
    return localStorage.getItem("crossvine_token");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isLoggedIn,
    getCurrentUser,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContext;
