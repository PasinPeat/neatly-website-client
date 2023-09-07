import React from "react";
import Navbar from "../components/Navbar";
import RoomResultCard from "../components/RoomResultCard";
import Search from "../components/Search";
import Footer from "../components/Footer";

function SearchResult() {
  const buttonStyle = {
    borderStyle: "solid",
    borderColor: "#E76B39",
    color: "#E76B39",
    backgroundColor: "white",
    borderWidth: "2px",
  };

  function filterSearchResult() {
    //เทียบข้อมูล user กับข้อมูลห้องทั้งหมด(rooms) แล้วคืนค่าเป็น array ห้องที่พักได้
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-end bg-white py-10 px-[220px] drop-shadow-md border-t-[1px] border-gray-300">
        <Search buttonStyle={buttonStyle} />
      </div>
      <div className="bg-bg  flex flex-col items-center pt-[90px] pb-[300px] px-[100px]">
        //เอา array มา map
        <RoomResultCard />
        {/* <RoomResultCard />
        <RoomResultCard />
        <RoomResultCard /> */}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
