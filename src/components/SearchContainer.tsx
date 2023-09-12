import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

function SearchContainer() {
  const [searchStateOnHome, setSearchStateOnHome] = useState({
    checkInDate: "",
    checkOutDate: "",
    room: 1,
    person: 2,
  });

  const navigate = useNavigate();

  const transferSearchState = (prevState) => {
    setSearchStateOnHome(prevState);
    // Navigate to the search result page with the updated state
    navigate("/search", { state: prevState });
  };

  return (
    <Search
      searchStateOnHome={searchStateOnHome}
      transferSearchState={transferSearchState}
    />
  );
}

export default SearchContainer;
