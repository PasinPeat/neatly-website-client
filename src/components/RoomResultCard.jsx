import React from "react";

function RoomResultCard() {
  return (
    <div>
      <div className="justify-between items-start gap-14 inline-flex bg-bg border-b-[1px] border-gray-300 text-gray-700">
        <div className=" flex gap-12 py-10">
          <div className="relative">
            <div className="w-[453px] h-[320px] rounded  bg-cover bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM1NTYxMjMsImV4cCI6MTcyNTA5MjEyM30.MAuhRFQuQ_RgNd6NTNFDOR5Eygp-vv_7pfB1Biot2KQ&t=2023-09-01T08%3A15%3A23.657Z')]"></div>
            <button className="absolute bottom-0 left-0 rounded-tr-lg opacity-60 bg-white p-2">
              <div className="w-6 h-6 opacity-60 bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ltYWdlLnN2ZyIsImlhdCI6MTY5Mzg4NjI4NSwiZXhwIjoxNzI1NDIyMjg1fQ.44CiKMoxMLmc_20EW3RzoUJyldns-KueYSKKLT6HLy8&t=2023-09-05T03%3A58%3A05.908Z')]"></div>
            </button>
          </div>
          <div className="flex flex-col py-6 justify-between">
            <div className="flex gap-6">
              <div className="w-[314px] text-left">
                <h2 className="text-headline4 text-black">
                  Superior Garden View
                </h2>
                <div className="pb-8">
                  <span className="text-gray-800">2</span>
                  <span> Guests</span>
                  <span className="px-3"> | </span>
                  <span className="text-gray-800">1 </span>
                  <span> Double bed</span>
                  <span className="px-3"> | </span>
                  <span className="text-gray-800">32</span>
                  <span> sqm</span>
                </div>
                <p className="text-body1">
                  Rooms (36sqm) with full garden views, 1 single bed, bathroom
                  with bathtub & shower.
                </p>
              </div>

              {/* right elements */}
              <div className="flex flex-col text-right text-body1 w-64">
                <p className="line-through pt-2">THB 3,100.00</p>
                <p className="text-headline5 text-black pb-3">THB 2,500.00</p>
                <p>
                  Per Night
                  <br />
                  (Including Taxes & Fees)
                </p>
                <p className="pt-2">
                  Avialable
                  <span>___</span>
                  <span>rooms</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-6">
              <button className="btn capitalize bg-bg border-none font-semibold text-base  text-orange-500 hover:bg-bg">
                Room Detail
              </button>
              <button className="btn Button px-8">Book now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomResultCard;
