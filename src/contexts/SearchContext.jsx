import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchArr, setSearchArr] = useState({
    date: "Newest",
    approval: null,
    type: null,
    search: "a e i o u y",
  });

  return (
    <SearchContext.Provider value={{ searchArr, setSearchArr }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    return { searchArr: null, setSearchArr: null };
  }
  return context;
}
