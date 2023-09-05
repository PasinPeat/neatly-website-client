import React from "react";

function RoomResultCard() {
  return (
    <div>
      <div className="justify-between items-start gap-14 inline-flex bg-bg ">
        <div className=" flex gap-12 py-10">
          <div className="w-[453px] h-[320px] rounded bg-black bg-cover bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM1NTYxMjMsImV4cCI6MTcyNTA5MjEyM30.MAuhRFQuQ_RgNd6NTNFDOR5Eygp-vv_7pfB1Biot2KQ&t=2023-09-01T08%3A15%3A23.657Z')]"></div>
          <div className="flex flex-col py-6 justify-between">
            <div className="flex gap-6">
              <div className="w-96 text-left">
                <h2 className="text-headline5 text-black">
                  Superior Garden View
                </h2>
                <div className="pb-8">
                  <span>2 person</span>
                  <span> | </span>
                  <span>1 Double bed</span>
                  <span> | </span>
                  <span>32 sqm</span>
                </div>
                <p className="text-body1">
                  Rooms (36sqm) with full garden views, 1 single bed, bathroom
                  with bathtub & shower.
                </p>
              </div>

              {/* right elements */}
              <div className="flex flex-col text-right text-body1 ">
                <p className="line-through pt-[8px]">THB 3,100.00</p>
                <p className="text-headline5 text-black pb-[12px]">
                  THB 2,500.00
                </p>
                <p>
                  Per Night
                  <br />
                  (Including Taxes & Fees)
                </p>
                <p>
                  Avialable
                  <span>___</span>
                  <span>rooms</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-6">
              <button className="btn capitalize bg-white border-none text-body1 text-orange-500 hover:bg-white">
                Room Detail
              </button>
              <button className="btn Button">Book now</button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default RoomResultCard;
