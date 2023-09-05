import RoomCard from "./RoomCard.tsx";
import { useContext } from "react";
import { RoomDetailContext } from "../../App.jsx";

function Rooms() {
  const context = useContext(RoomDetailContext);

  return (
    // {context.room_images[0]}

    <div className="py-28 px-40 flex flex-col items-center justify-center bg-white">
      <div className="font-noto-serif-display text-green-800 text-headline2">
        Rooms & Suits
      </div>
      <div className="mt-[72px] w-full grid grid-cols-5 gap-4">
        <div className="grid col-span-5 h-[540px] bg-cover bg-center bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM4MzUxMTksImV4cCI6MTcyNTM3MTExOX0.NCux_pItpHFf9WqMaPDsjukXHFofhBnpjglVo5aGJng&t=2023-09-04T13%3A45%3A17.758Z')]">
          <RoomCard>Superior Garden View</RoomCard>
        </div>
        <div className="grid col-span-3 row-start-2 h-[400px] bg-cover bg-center bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/deluxe?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvZGVsdXhlIiwiaWF0IjoxNjkzODM5MDIyLCJleHAiOjE3MjUzNzUwMjJ9.uQ6nIjwjOgzhyhmg_JmX9Lg9yKfce0gtfTWyR_3yBc8&t=2023-09-04T14%3A50%3A20.836Z')]">
          <RoomCard>Deluxe</RoomCard>
        </div>
        <div className="grid col-span-2 row-span-2 col-start-1 row-start-3 bg-cover bg-center bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/premium?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvcHJlbWl1bSIsImlhdCI6MTY5MzgzOTIxNywiZXhwIjoxNzI1Mzc1MjE3fQ.Wi6XS0OIymr5SD0lye8tM-p1DC5ITXbBh2wqODQcAg0&t=2023-09-04T14%3A53%3A36.330Z')]">
          <RoomCard>Premier Sea View</RoomCard>
        </div>
        <div className="grid col-span-3 col-start-3 row-start-3 h-[338px] bg-cover bg-center bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/supreme?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwcmVtZSIsImlhdCI6MTY5MzgzOTM1MiwiZXhwIjoxNzI1Mzc1MzUyfQ.evAvuthb6NOlwLY9uM8d109gFqZrjX-HNCzZhuFC1_g&t=2023-09-04T14%3A55%3A50.793Z')]">
          <RoomCard>Supreme</RoomCard>
        </div>
        <div className="grid col-span-3 col-start-3 row-start-4 h-[338px] bg-cover bg-center bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/suite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VpdGUiLCJpYXQiOjE2OTM4Mzk1MTMsImV4cCI6MTcyNTM3NTUxM30.3ar_gYe2n9lAOLpJFHHuOQrWtIv1VbxaLoGnhbNMtbY&t=2023-09-04T14%3A58%3A31.440Z')]">
          <RoomCard>Suite</RoomCard>
        </div>
        <div className="grid col-span-2 col-start-4 row-start-2h-[400px] bg-cover bg-center bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3IiLCJpYXQiOjE2OTM4Mzk1NzMsImV4cCI6MTcyNTM3NTU3M30.BW7mqoWrn9mlEXbj2l2jXb_YVVzf19rC_vEkUIIZKck&t=2023-09-04T14%3A59%3A31.976Z')]">
          <RoomCard>Superior</RoomCard>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
