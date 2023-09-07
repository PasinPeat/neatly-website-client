import SingleSlidebar from "../components/SingleSlidebar";
import { RoomsProps } from "../interfaces/RoomsProps.tsx";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function RoomDetailPopup() {
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

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[800px] h-[577px] flex flex-col items-center bg-white">
        <div className="w-[100%] flex justify-between items-center h-[60px] pl-20 border-b-[1px] border-gray-300">
          <h2 className="text-black text-headline5">{roomDetail?.room_type}</h2>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M22 38L38 22M22 22L38 38"
                stroke="#C8CCDB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="overflow-y-scroll scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-none pl-20 pr-16 pt-4 pb-[60px]"
          // style={{
          //   width: "8px",
          //   borderRadius: "50%",
          // }}
        >
          {/* Photo Slide */}
          <div>
            <SingleSlidebar />
          </div>

          {/* description */}
          <div className="flex flex-col text-gray-700 text-body1 ">
            <div className="pb-4 pt-9 ">
              <span className="text-gray-800">2</span>
              <span> Person</span>
              <span className="px-4"> | </span>
              <span className="text-gray-800">{roomDetail?.bed_types}</span>
              <span> Double bed</span>
              <span className="px-4"> | </span>
              <span className="text-gray-800">{roomDetail?.area}</span>
              <span> sqm</span>
            </div>
            <p className="pb-10">{roomDetail?.description}</p>

            <div>
              <p className="text-black py-4 border-t-[1px] border-gray-300">
                Room Amenities
              </p>
              <ul className="columns-2 pl-6 list-disc break-inside-avoid-column">
                {roomDetail?.amenity.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPopup;
