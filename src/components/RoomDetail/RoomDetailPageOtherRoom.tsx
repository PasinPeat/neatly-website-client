import React from "react";
import OtherRoomCard from "./OtherRoomCard";

function RoomDetailPageOtherRoom({ randomRooms }) {
  console.log(randomRooms);

  return (
    <div className=" bg-green-200  flex flex-col items-center pt-[90px] pb-[100px] px-[160px]">
      <div className="w-[1120px] ">
        <h1 className="text-black text-headline3 text-center font-noto-serif-display mb-14">
          Other Rooms
        </h1>
        <div className="flex flex-row w-full gap-6">
          <OtherRoomCard />
          <OtherRoomCard />
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPageOtherRoom;
