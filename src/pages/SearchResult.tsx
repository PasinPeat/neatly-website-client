import React from "react";
import Navbar from "../components/Navbar";
import RoomResultCard from "../components/RoomResultCard";
import Footer from "../components/Footer";

function SearchResult() {
  return (
    <div>
      <Navbar />

      <div className="bg-bg  flex flex-col items-center pt-[90px] pb-[100px] px-[160px]">
        <RoomResultCard />
        <RoomResultCard />
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
