import { RoomsProps } from "../interfaces/RoomsProps.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RoomResultCard() {
  const [rooms, setRooms] = useState<RoomsProps[] | []>([]);
  const navigate = useNavigate();

  const getRoomData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/room");
      setRooms(res.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
      navigate("/NotFound");
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);

  return (
    <div>
      {rooms.map((item, index) => {
        return (
          <div
            key={index}
            className="justify-between items-start gap-14 inline-flex bg-bg border-b-[1px] border-gray-300 text-gray-700"
          >
            <div className=" flex gap-12 py-10">
              <div className="relative">
                <img
                  className="w-[453px] h-[320px] rounded bg-cover"
                  src={item.room_images[0]}
                />
                <button className="absolute bottom-0 left-0 rounded-tr-lg opacity-60 bg-white p-2">
                  <div className="w-6 h-6 opacity-60 bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/image.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ltYWdlLnN2ZyIsImlhdCI6MTY5Mzg4NjI4NSwiZXhwIjoxNzI1NDIyMjg1fQ.44CiKMoxMLmc_20EW3RzoUJyldns-KueYSKKLT6HLy8&t=2023-09-05T03%3A58%3A05.908Z')]"></div>
                </button>
              </div>

              <div className="flex flex-col py-6 justify-between">
                <div className="flex gap-6">
                  <div className="w-[314px] text-left">
                    <h2 className="text-headline4 text-black">
                      {item.room_type}
                    </h2>
                    <div className="pb-8">
                      <span className="text-gray-800">{item.person}</span>
                      <span> Guests</span>
                      <span className="px-3"> | </span>
                      <span>
                        {item.bed_types.split(" ").map((part, index) => {
                          if (index === 0) {
                            const quantity = part;
                            return (
                              <span key={index} className="text-gray-800">
                                {quantity}{" "}
                              </span>
                            );
                          } else if (index === 1) {
                            const itemName = part;
                            return <span key={index}> {itemName} </span>;
                          }
                          return null;
                        })}
                      </span>
                      <span className="px-3"> | </span>
                      <span className="text-gray-800">{item.area}</span>
                      <span> sqm</span>
                    </div>
                    <p className="text-body1">{item.description}</p>
                  </div>

                  {/* right elements */}
                  <div className="flex flex-col text-right text-body1 w-64">
                    <p className="line-through pt-2">
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "THB",
                      })}
                    </p>
                    <p className="text-headline5 text-black pb-3">
                      {item.promotion_price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "THB",
                      })}
                    </p>
                    <p>
                      Per Night
                      <br />
                      (Including Taxes & Fees)
                    </p>
                    <p className="pt-2">
                      Avialable
                      <span>{item.amount_vacant}</span>
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
        );
      })}
    </div>
  );
}

export default RoomResultCard;
