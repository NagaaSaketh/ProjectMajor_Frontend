import { createContext, useContext } from "react";
import { useState } from "react";

const SearchContext = createContext();

const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  console.log(search);

  return (
    <>
      <SearchContext.Provider value={{ handleSearch, search }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};

export default useSearchContext;
