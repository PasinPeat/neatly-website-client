import React from "react";
import RoomCard from "../Home/RoomCard";
import { useContext } from "react";
import { RoomsContext } from "../../App.tsx";

function RoomDetailPageOtherRoom({ paramsId }) {
  const context = useContext(RoomsContext);

  let otherRooms = [];

  function getOtherRooms() {
    const unselectedRooms = context.rooms.filter(
      (room) => room.room_id !== Number(paramsId)
    );
    console.log(unselectedRooms);
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * unselectedRooms.length);
      if (!otherRooms.includes(unselectedRooms[randomIndex])) {
        otherRooms.push(unselectedRooms[randomIndex]);
      }
    }
    console.log(otherRooms);
  }

  getOtherRooms();

  return (
    <div className=" bg-green-200  flex flex-col items-center pt-[90px] pb-[100px] px-[160px]">
      <div>
        <h1 className="text-black text-headline3 text-center font-noto-serif-display mb-14">
          Other Rooms
        </h1>
        <div className="flex flex-row gap-6">
          {otherRooms.map((room) => (
            <div className="flex h-[340px]">
              <RoomCard roomType={room.room_type} cardWidth={"548px"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPageOtherRoom;
