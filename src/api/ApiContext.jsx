import { createContext, useState, useContext } from "react";
import { useAuth } from "../auth/AuthContext";
export const API = import.meta.env.VITE_API;

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const [tags, setTags] = useState({});

  const request = async (resource, options) => {
    //console.log("API Request:", API + resource, options);
    try {
      const response = await fetch(API + resource, {
        ...options,
        headers,
      });
      
      const isJson = /json/.test(response.headers.get("Content-Type"));
      const result = isJson ? await response.json() : undefined;
      if (!response.ok) {
        throw Error(result.error ?? "Something went wrong :(");
      }
      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const provideTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };

  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];
      if (query) {
        query();
      }
    });
  };

  const value = { request, provideTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
