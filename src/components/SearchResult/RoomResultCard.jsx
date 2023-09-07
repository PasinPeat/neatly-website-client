import React from "react";
import { useNavigate } from "react-router-dom";
import RoomDetailPopup from "./RoomDetailPopup";

function RoomResultCard({
  roomId,
  roomImages,
  roomType,
  bedType,
  description,
  area,
  price,
  promotionPrice,
  amenity,
  person,
  available,
  onRoomDetail,
  onFullImage,
}) {
  // console.log(roomType);
  // console.log(person);
  const navigate = useNavigate();

  const backgroundImage = {
    backgroundImage: `url('${roomImages[2]}')`,
  };

  return (
    <div>
      <div className="justify-between items-start gap-14 inline-flex bg-bg border-b-[1px] border-gray-300 text-gray-700">
        <div className=" flex gap-12 py-10">
          <div className="relative">
            <div
              style={backgroundImage}
              className="w-[453px] h-[320px] rounded bg-cover bg-center"
            ></div>
            <button
              onClick={() => onFullImage(roomId)}
              className="absolute bottom-0 left-0 rounded-tr-lg opacity-60 bg-white p-2"
            >
              <div className="w-6 h-6 opacity-60 bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ltYWdlLnN2ZyIsImlhdCI6MTY5Mzg4NjI4NSwiZXhwIjoxNzI1NDIyMjg1fQ.44CiKMoxMLmc_20EW3RzoUJyldns-KueYSKKLT6HLy8&t=2023-09-05T03%3A58%3A05.908Z')]"></div>
            </button>
          </div>
          <div className="flex flex-col py-6 justify-between">
            <div className="flex gap-6">
              <div className="w-[314px] text-left">
                <h2 className="text-headline4 text-black">{roomType}</h2>
                <div className="pb-8 text-gray-800">
                  <span>{person}</span>
                  <span> Guests</span>
                  <span className="px-3"> | </span>
                  <span>{bedType}</span>
                  <span className="px-3"> | </span>
                  <span>{area}</span>
                  <span> sqm</span>
                </div>
                <p className="text-body1">{description}</p>
              </div>

              {/* right elements */}
              <div className="flex flex-col text-right text-body1 w-64">
                <p className="line-through pt-2">
                  THB{" "}
                  {price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })}
                </p>
                <p className="text-headline5 text-black pb-3">
                  THB{" "}
                  {promotionPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })}
                </p>
                <p>
                  Per Night
                  <br />
                  (Including Taxes & Fees)
                </p>
                <p className="pt-2 text-black font-semibold">
                  <span className="pr-1">{available}</span>
                  {available === 1 && <span>room</span>}
                  {available > 1 && <span>rooms</span>}
                  <span className="pl-1">available</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-6">
              <button
                onClick={() => onRoomDetail(roomId)}
                className="btn capitalize bg-bg border-none font-semibold text-base  text-orange-500 hover:bg-bg"
              >
                Room Detail
              </button>
              <button
                className="btn Button"
                onClick={() => navigate("/Payment")}
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomResultCard;
