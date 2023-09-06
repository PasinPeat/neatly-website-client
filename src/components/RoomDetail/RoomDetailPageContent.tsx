import React from "react";
import axios from "axios";
import { RoomsProps } from "../../interfaces/RoomsProps.tsx";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RoomDetailPageContent({
  roomType,
  bedType,
  description,
  area,
  price,
  promotionPrice,
  amenity,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-gray-200 pb-[222px] pt-[80px]">
      <div>
        <div className="flex flex-col gap-14 pb-20 border-b-2 border-indigo-500">
          <h1 className=" text-black text-headline3 text-left font-noto-serif-display">
            {roomType}
          </h1>
          <div className="justify-between items-start gap-14 inline-flex">
            <div className="flex flex-col items-start gap-14">
              <div className="w-96 text-left ">{description}</div>
              <div className="">
                <span>2 person</span>
                <span> | </span>
                <span>{bedType}</span>
                <span> | </span>
                <span>{area}</span>
              </div>
            </div>
            <div className="flex flex-col gap-10 w-36 h-36">
              <div className="">
                <div className="text-base text-right font-extralight line-through">
                  {price.toLocaleString()}
                </div>
                <div className="text-xl text-right text-black font-semibold">
                  {promotionPrice.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="btn Button border-orange-600"
                  onClick={() => navigate("/login")}
                >
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
              {amenity.map((item) => {
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
