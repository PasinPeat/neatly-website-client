import React from "react";
import Navbar from "../components/Navbar";
import RoomResultCard from "../components/RoomResultCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

function SearchResult() {
  return (
    <div>
      <Navbar />

      <SearchBar />
      <div className="bg-bg  flex flex-col items-center pt-[90px] pb-[300px] px-[100px]">
        <RoomResultCard />
        <RoomResultCard />
        <RoomResultCard />
        <RoomResultCard />
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
