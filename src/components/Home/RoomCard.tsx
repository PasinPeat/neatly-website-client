import { useContext } from "react";
import { RoomsContext } from "../../App.jsx";
import { RoomsProps } from "../../interfaces/RoomsProps.tsx";
import { Link } from "react-router-dom";

function RoomCard({
  roomType,
  cardWidth,
}: {
  roomType: string;
  cardWidth: string;
}) {
  const context = useContext(RoomsContext);
  // console.log(context.rooms);

  const room: RoomsProps | undefined = context.rooms.find(
    (room) => room.room_type === roomType
  );

  if (!room) {
    return <div>Room Not Found</div>;
  }
  // console.log(room);
  // console.log(room.room_images[0]);

  const backgroundImage = {
    display: "flex",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url('${room.room_images[0]}')`,
    width: `${cardWidth}`,
  };

  return (
    // 'https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM4MzUxMTksImV4cCI6MTcyNTM3MTExOX0.NCux_pItpHFf9WqMaPDsjukXHFofhBnpjglVo5aGJng&t=2023-09-04T13%3A45%3A17.758Z'
    // {`flex bg-cover bg-center bg-[url('${room.room_images[0]}')]`}
    // "flex bg-cover bg-center bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-graden-2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ3JhZGVuLTIiLCJpYXQiOjE2OTM4MzUxMTksImV4cCI6MTcyNTM3MTExOX0.NCux_pItpHFf9WqMaPDsjukXHFofhBnpjglVo5aGJng&t=2023-09-04T13%3A45%3A17.758Z')]"
    <div style={backgroundImage}>
      <div className="w-full bg-black bg-opacity-30 pl-16 pb-20 flex items-end justify-start">
        <div className="z-10">
          <div className="mb-3 font-noto-serif-display text-headline3 text-white">
            {room.room_type}
          </div>
          <div>
            <Link to={`/room/${room.room_id}`}>
              <span className="text-white text-body1">Explore Room</span>
            </Link>
            <img
              className="ml-2 inline"
              alt="arrow"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow-white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93LXdoaXRlLnN2ZyIsImlhdCI6MTY5MzgzMTEyMSwiZXhwIjoxNzI1MzY3MTIxfQ.2Zd30troHxJvO6UpeEz7ykQGoNPcO-QGhwjg766-zeQ&t=2023-09-04T12%3A38%3A40.182Z"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RoomCard;
