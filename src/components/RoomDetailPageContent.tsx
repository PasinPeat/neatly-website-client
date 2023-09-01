import React from "react";

function RoomDetailPageContent() {
  return (
    <div className="flex justify-center bg-white">
      <div>
        <div className="flex flex-col gap-14 pb-20 border-b-2 border-indigo-500">
          <h1 className=" text-black text-headline3 text-left font-noto-serif-display">
            Superior Garden View
          </h1>
          <div className="justify-between items-start gap-14 inline-flex">
            <div className=" flex flex-col items-start gap-14">
              <div className="w-96 text-left ">
                Rooms (36sqm) with full garden views, 1 single bed, bathroom
                with bathtub & shower.
              </div>
              <div className="">
                <span>2 person</span>
                <span> | </span>
                <span>1 Double bed</span>
                <span> | </span>
                <span>32 sqm</span>
              </div>
            </div>
            <div className="flex flex-col gap-10 w-36 h-36">
              <div className="">
                <div className="text-base text-right font-extralight line-through">
                  THB 3,100.00
                </div>
                <div className="text-xl text-right text-black font-semibold">
                  THB 2,500.00
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
          <div className="text-left">
            <ul>
              <li>Safe in Room</li>
              <li>Air Conditioning</li>
              <li>High speed internet connection</li>
              <li>Hairdryer</li>
              <li>Shower</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPageContent;
