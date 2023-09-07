import React from "react";
import Navbar from "../components/Navbar";
import RoomDetailSlidebar from "../components/RoomDetail/RoomDetailSlidebar";
import RoomDetailPageContent from "../components/RoomDetail/RoomDetailPageContent";
import RoomDetailPageOtherRoom from "../components/RoomDetail/RoomDetailPageOtherRoom";
import Footer from "../components/Footer";
import { RoomsProps } from "../interfaces/RoomsProps.tsx";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function RoomDetail() {
  const [roomDetail, setRoomDetail] = useState<RoomsProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getRoomId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/room/${params.roomId}`
      );
      setRoomDetail(res.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
      navigate("/NotFound");
    }
  };

  useEffect(() => {
    getRoomId();
  }, [params.roomId]);

  // let otherRooms = [];

  // function getOtherRooms() {
  //   if (roomDetail !== null) {
  //     const unselectedRooms = context.rooms.filter(
  //       (room) => room.room_id !== Number(params.roomId)
  //     );
  //     console.log(unselectedRooms);
  //     for (let i = 0; i < 2; i++) {
  //       const randomIndex = Math.floor(Math.random() * unselectedRooms.length);
  //       if (!otherRooms.includes(unselectedRooms[randomIndex])) {
  //         otherRooms.push(unselectedRooms[randomIndex]);
  //       }
  //     }
  //     console.log(otherRooms);
  //   }
  // }
  // getOtherRooms();

  if (roomDetail === null) {
    return <div className="flex justify-center">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <RoomDetailSlidebar roomImages={roomDetail.room_images} />
      <RoomDetailPageContent
        roomType={roomDetail.room_type}
        bedType={roomDetail.bed_types}
        description={roomDetail.description}
        area={roomDetail.area}
        price={roomDetail.price}
        promotionPrice={roomDetail.promotion_price}
        amenity={roomDetail.amenity}
      />
      <RoomDetailPageOtherRoom paramsId={params.roomId} />
      <Footer />
    </>
  );
}

export default RoomDetail;
