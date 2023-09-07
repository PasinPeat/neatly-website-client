import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import App from "../../App.css";
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
        <div className="w-[738px] flex flex-col gap-14 pb-20 border-b-2 border-indigo-500">
          <h1 className="text-green-800 text-headline2 text-left font-noto-serif-display">
            {roomType}
          </h1>
          <div className="justify-between items-start gap-14 inline-flex">
            <div className="flex flex-col items-start gap-14">
              <div className="w-96 text-left ">{description}</div>
              <div className="">
                <span>2 Person</span>
                <span> | </span>
                <span>{bedType}</span>
                <span> | </span>
                <span>{area}</span>
                <span> sqm </span>
              </div>
            </div>
            <div className="flex flex-col gap-10 w-36 h-36">
              <div className="">
                <div className=" text-md text-right font-extralight line-through">
                  
                  {price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })}
                </div>
                <div className=" text-headline5 text-right text-black font-semibold">
                  
                  {promotionPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })}
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
        <div className="flex flex-col border-t-2 border-gray-300">
          <div className=" text-left text-xl text-black font-bold mb-6 mt-10">
            <p>Room Amenities</p>
          </div>
          <div className="">
            <ul className={` list-disc grid grid-cols-1  gap-2 ${amenity.length > 8 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
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
