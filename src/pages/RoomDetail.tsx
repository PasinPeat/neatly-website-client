import React from "react";
import Navbar from "../components/Navbar";
import RoomDetailSlidebar from "../components/RoomDetail/RoomDetailSlidebar";
import RoomDetailPageContent from "../components/RoomDetail/RoomDetailPageContent";
import RoomDetailPageOtherRoom from "../components/RoomDetail/RoomDetailPageOtherRoom";
import Footer from "../components/Footer";
import { useContext } from "react";
import { RoomsContext } from "../App.tsx";
import { RoomsProps } from "../interfaces/RoomsProps.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RoomDetail() {
  const [roomDetail, setRoomDetail] = useState<RoomsProps | null>(null);
  const [randomRooms, setRandomRooms] = useState<RoomsProps[]>([]);
  const params = useParams<{ roomId: string }>();
  const context = useContext(RoomsContext);

  const getRoomId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/room/${params.roomId}`
      );
      setRoomDetail(res.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    getRoomId();
  }, [params.roomId]);

  // Move this useEffect block outside of any condition
  useEffect(() => {
    if (roomDetail !== null) {
      const otherRoom = context.rooms.filter(
        (room) => room.room_id !== params.roomId
      );
      const randomIndex = Math.floor(Math.random() * otherRoom.length);
      setRandomRooms([otherRoom[randomIndex]]);
      console.log(randomRooms);
    }
  }, [roomDetail, context.rooms, params.roomId]);

  if (roomDetail === null) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (!roomDetail.room_type) {
    return <div>Room Not Found</div>;
  }
  console.log(randomRooms);
  // const otherRoom = context.rooms.filter(
  //   (room) => room.room_id !== params.roomId
  // );

  // useEffect(() => {
  //   const randomIndex = Math.floor(Math.random() * otherRoom.length);
  //   setRandomRooms([otherRoom[randomIndex]]);
  //   console.log(randomRooms);
  // }, [otherRoom]);

  //random other rooms

  // console.log(context.rooms);
  // console.log(params.roomId);
  // console.log(otherRoom);

  // console.log(roomDetail.room_type);

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
      <RoomDetailPageOtherRoom randomRooms={randomRooms} />
      <Footer />
    </>
  );
}

export default RoomDetail;
