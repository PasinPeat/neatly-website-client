import React from "react";
import Navbar from "../components/Navbar";

import RoomDetailPageContent from "../components/RoomDetailPageContent";
import RoomDetailPageOtherRoom from "../components/RoomDetailPageOtherRoom";
import RoomDetailSlidebar from "../components/RoomDetailSlidebar";
import Footer from "../components/Footer";
import SingleSlidebar from "../components/SingleSlidebar";

function RoomDetail() {
  return (
    <>
      <Navbar />
      <RoomDetailSlidebar />
      <RoomDetailPageContent />
      <RoomDetailPageOtherRoom />
      <SingleSlidebar/>
      <Footer />
    </>
  );
}

export default RoomDetail;
