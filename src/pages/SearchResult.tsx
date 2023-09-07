import React from "react";
import Navbar from "../components/Navbar";
import RoomResultCard from "../components/RoomResultCard";
import Search from "../components/Search";
import Footer from "../components/Footer";

function SearchResult() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-end bg-white py-10 px-[220px] drop-shadow-md border-t-[1px] border-gray-300">
        <Search />
      </div>
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
