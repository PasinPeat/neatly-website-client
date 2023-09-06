import React from "react";
import axios from "axios";
import { RoomsProps } from "../../interfaces/RoomsProps.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RoomDetailPageContent() {
  const [roomDetail, setRoomDetail] = useState<RoomsProps | null>(null);
  const params = useParams<{ roomId: string }>();

  const getRoomId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/room/${params.roomId}`
      );
      // console.log(res.data.data);
      setRoomDetail(res.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    getRoomId();
  }, [params.roomId]);

  if (roomDetail === null) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (!roomDetail.room_type) {
    return <div>Room Not Found</div>;
  }

  return (
    <div className="flex justify-center bg-white pb-[222px] pt-[80px]">
      <div>
        <div className="flex flex-col gap-14 pb-20 border-b-2 border-indigo-500">
          <h1 className=" text-black text-headline3 text-left font-noto-serif-display">
            {roomDetail.room_type}
          </h1>
          <div className="justify-between items-start gap-14 inline-flex">
            <div className="flex flex-col items-start gap-14">
              <div className="w-96 text-left ">{roomDetail.description}</div>
              <div className="">
                <span>2 person</span>
                <span> | </span>
                <span>{roomDetail.bed_types}</span>
                <span> | </span>
                <span>{roomDetail.area}</span>
              </div>
            </div>
            <div className="flex flex-col gap-10 w-36 h-36">
              <div className="">
                <div className="text-base text-right font-extralight line-through">
                  {roomDetail.price.toLocaleString()}
                </div>
                <div className="text-xl text-right text-black font-semibold">
                  {roomDetail.promotion_price.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn Button border-orange-600">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <br className="w-full border-solid border-r-green-800 "/ > */}
        <div className="flex flex-col">
          <div className=" text-left text-xl text-black font-bold mb-6 mt-10">
            <p>Room Amenities</p>
          </div>
          <div className="">
            <ul className="ml-4 list-disc">
              {roomDetail.amenity.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPageContent;
