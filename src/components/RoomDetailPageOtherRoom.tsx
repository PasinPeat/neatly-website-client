import React from "react";

function RoomDetailPageOtherRoom() {
  return (
    <div className=" bg-green-200  flex flex-col items-center pt-[90px] pb-[100px] px-[160px]">
      <div className="w-[1120px] ">
        <h1 className="text-black text-headline3 text-center font-noto-serif-display mb-14">
          Other Rooms
        </h1>
        <div className="flex flex-row w-full gap-6">
          <div className="grid flex-grow card  rounded-md h-80 relative bg-black bg-cover hover: bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/deluxe?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvZGVsdXhlIiwiaWF0IjoxNjkzNTU1OTQ3LCJleHAiOjE3MjUwOTE5NDd9.S9WtQwiVa1DhJg2wVZ9Yeb0zLfdHq5P2LeBg2DIvdLc&t=2023-09-01T08%3A12%3A26.986Z')]">
            <div className=" w-36 h-[103px] absolute bottom-12 left-16 ">
              <h1 className="text-white text-headline4 font-noto-serif-display mb-2">
                Deluxe
              </h1>
              <p className="text-white font-semibold">Explore Room</p>
            </div>
          </div>

          <div className="grid flex-grow card  rounded-md h-80 relative bg-black bg-cover bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM1NTYxMjMsImV4cCI6MTcyNTA5MjEyM30.MAuhRFQuQ_RgNd6NTNFDOR5Eygp-vv_7pfB1Biot2KQ&t=2023-09-01T08%3A15%3A23.657Z')]">
            <div className=" w-36 h-[103px] absolute bottom-12 left-16 ">
              <h1 className="text-white text-headline4 font-noto-serif-display mb-2">
                Superior
              </h1>
              <p className="text-white font-semibold">Explore Room</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPageOtherRoom;
