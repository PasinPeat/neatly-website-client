import React from "react";

function RoomDetailPopup() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[800px] h-[577px] flex flex-col items-center bg-white">
        <div className="w-[100%] flex justify-between items-center h-[60px] pl-20 border-b-[1px] border-gray-300">
          <h2 className="text-black text-headline5">Superior Garden View</h2>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-scroll px-20 pt-4 pb-[60px]">
          {/* Photo Slide */}
          <div>
            <div className="w-[640px] h-[400px] rounded bg-cover bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM1NTYxMjMsImV4cCI6MTcyNTA5MjEyM30.MAuhRFQuQ_RgNd6NTNFDOR5Eygp-vv_7pfB1Biot2KQ&t=2023-09-01T08%3A15%3A23.657Z')]"></div>
          </div>

          {/* description */}
          <div className="flex flex-col text-gray-700 text-body1 ">
            <div className="pb-4 pt-9 ">
              <span className="text-gray-800">2</span>
              <span> Person</span>
              <span className="px-4"> | </span>
              <span className="text-gray-800">1 </span>
              <span> Double bed</span>
              <span className="px-4"> | </span>
              <span className="text-gray-800">32</span>
              <span> sqm</span>
            </div>
            <p className="pb-10">
              Rooms (36sqm) with full garden views, 1 single bed, bathroom with
              bathtub & shower.
            </p>

            <div>
              <p className="text-black py-4 border-t-[1px] border-gray-300">
                Room Amenities
              </p>
              <ul className="columns-2 pl-6 list-disc break-inside-avoid-column">
                <li>Safe in Room</li>
                <li>Air Conditioning</li>
                <li>High speed internet connection</li>

                <li>Hairdryer</li>
                <li>Shower</li>
                <li>Bathroom amenities</li>
                <li>Lamp</li>
                <li>Minibar</li>
                <li>Telephone</li>
                <li>Ironing board</li>
                <li>A floor only accessible via a guest room key</li>
                <li>Alarm Clock</li>
                <li>Bathrobe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPopup;
