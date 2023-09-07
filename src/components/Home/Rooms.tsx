import RoomCard from "./RoomCard.tsx";

function Rooms() {
  return (
    <div className="py-28 px-40 flex flex-col items-center justify-center bg-white"
    id="roomSuits">
      <div className="font-noto-serif-display text-green-800 text-headline2">
        Rooms & Suits
      </div>
      <div className="mt-[72px] w-full grid grid-cols-5 gap-4">
        <div className="grid col-span-5 h-[540px]">
          <RoomCard roomType={"Superior Garden View"} />
        </div>
        <div className="grid col-span-3 row-start-2 h-[400px]">
          <RoomCard roomType={"Deluxe"} />
        </div>
        <div className="grid col-span-2 row-span-2 col-start-1 row-start-3">
          <RoomCard roomType={"Premier Sea View"} />
        </div>
        <div className="grid col-span-3 col-start-3 row-start-3 h-[338px]">
          <RoomCard roomType={"Supreme"} />
        </div>
        <div className="grid col-span-3 col-start-3 row-start-4 h-[338px]">
          <RoomCard roomType={"Suite"} />
        </div>
        <div className="grid col-span-2 col-start-4 row-start-2h-[400px]">
          <RoomCard roomType={"Superior"} />
        </div>
      </div>
    </div>
  );
}

export default Rooms;
