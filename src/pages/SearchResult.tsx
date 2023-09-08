import React, { useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import RoomResultCard from "../components/SearchResult/RoomResultCard";
import RoomDetailPopup from "../components/SearchResult/RoomDetailPopup";
import Search from "../components/Search";
import Footer from "../components/Footer";
import ImageFullPopup from "../components/SearchResult/ImageFullPopup.tsx";
import { useContext, useState } from "react";
import { RoomsContext } from "../App.tsx";
import { RoomsProps } from "../interfaces/RoomsProps.tsx";

function SearchResult() {
  const context = useContext(RoomsContext);
  const buttonStyle = {
    borderStyle: "solid",
    borderColor: "#E76B39",
    color: "#E76B39",
    backgroundColor: "white",
    borderWidth: "2px",
  };
  const [showRoomDetail, setShowRoomDetail] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomsProps | null>(null);
  const [roomResult, setRoomResult] = useState<RoomsProps[]>(context.rooms);
  const [disable, setDisable] = useState(false);

  //filter rooms
  function handleSearchResult(result) {
    const filteredRooms = context.rooms.filter(
      (room) => room.person >= result.person
    );
    setRoomResult(filteredRooms);

    let isDisabled = false;

    filteredRooms.forEach((room) => {
      console.log(room.available);
      if (room.available < result.room || room.amount < result.room) {
        isDisabled = true;
      }
    });
    setDisable(isDisabled);
    console.log(disable);
    

  }

  //show room detail
  function handleRoomDetail(roomId) {
    const room = context.rooms.find((room) => room.room_id === roomId);
    if (room) {
      setSelectedRoom(room);
      setShowRoomDetail(true);
    }
  }

  //show full image
  function handleFullImage(roomId) {
    const room = context.rooms.find((room) => room.room_id === roomId);
    if (room) {
      setSelectedRoom(room);
      setShowFullImage(true);
    }
  }

  function handleClosePopup() {
    setShowRoomDetail(false);
    setShowFullImage(false);
  }

  return (
    <div>
      {showFullImage && (
        <div className="fixed z-50 top-0 flex justify-center">
          <ImageFullPopup
            roomImages={selectedRoom.room_images}
            onClosePopup={handleClosePopup}
          />
        </div>
      )}
      {showRoomDetail && (
        <div className="sticky z-50 top-0 flex justify-center">
          <RoomDetailPopup
            roomId={selectedRoom.room_id}
            roomType={selectedRoom.room_type}
            roomImages={selectedRoom.room_images}
            bedType={selectedRoom.bed_types}
            description={selectedRoom.description}
            area={selectedRoom.area}
            price={selectedRoom.price}
            promotionPrice={selectedRoom.promotion_price}
            amenity={selectedRoom.amenity}
            person={selectedRoom.person}
            available={selectedRoom.available}
            onClosePopup={handleClosePopup}
          />
        </div>
      )}
      <Navbar />
      <div className="flex justify-center items-end bg-white py-10 px-[220px] drop-shadow-md border-t-[1px] border-gray-300">
        <Search buttonStyle={buttonStyle} onSearchResult={handleSearchResult} />
      </div>
      <div className="bg-bg flex flex-col items-center pt-[90px] pb-[300px] px-[100px]">
        {roomResult.map((room) => (
          <RoomResultCard
            roomId={room.room_id}
            roomType={room.room_type}
            roomImages={room.room_images}
            bedType={room.bed_types}
            description={room.description}
            area={room.area}
            price={room.price}
            promotionPrice={room.promotion_price}
            amenity={room.amenity}
            person={room.person}
            available={room.available}
            onRoomDetail={handleRoomDetail}
            onFullImage={handleFullImage}
            disable={disable}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
