import React from "react";
import Navbar from "../components/Navbar";
import RoomDetailSlidebar from "../components/RoomDetail/RoomDetailSlidebar";
import RoomDetailPageContent from "../components/RoomDetail/RoomDetailPageContent";
import RoomDetailPageOtherRoom from "../components/RoomDetail/RoomDetailPageOtherRoom";
import Footer from "../components/Footer";

function RoomDetail() {
  return (
    <>
      <Navbar />
      <RoomDetailSlidebar />
      <RoomDetailPageContent />
      <RoomDetailPageOtherRoom />
      <Footer />
    </>
  );
}

export default RoomDetail;
