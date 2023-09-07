import React from "react";
import { useState } from "react";

function Search({ buttonStyle }) {
  const [checkInDate, setCheckInDate] = useState(useState<number>(Date.now()));
  const [checkOutDate, setCheckOutDate] = useState();
  const [roomsAndGuests, setRoomsAndGuests] = useState();

  // function handleSubmit(e) {
  //   e.preventDefault();

  // if (!name) return;
  // const newProduct = {
  //   id: Date.now(),
  //   name,
  //   img,
  //   price,
  //   quantity,
  //   unit,
  //   bought: false,
  // };

  // onAddProduct(newProduct);

  //   setCheckIn();
  //   setCheckOut();
  //   setRoomsAndGuests();
  // }

  // const getRoomId = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:4000/room/${params.roomId}`
  //     );
  //     setRoomDetail(res.data.data);
  //   } catch (error) {
  //     console.error("Error fetching room data:", error);
  //     navigate("/NotFound");
  //   }
  // };

  return (
    <div className="flex justify-center items-end">
      <div className="form-control">
        <label className="label">
          <span className="text-gray-900 text-body1">Check In</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-60 text-gray-600"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>
      <div className="px-8 py-4">-</div>
      <div className="form-control pr-10">
        <label className="label">
          <span className="text-gray-900 text-body1">Check Out</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-60 text-gray-600"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </div>
      <div className="pr-10">
        <label className="label">
          <span className="text-gray-900 text-body1">Rooms & Guests</span>
        </label>
        <select
          className="w-60 select select-bordered text-gray-600 text-body1"
          onChange={(e) => setRoomsAndGuests(e.target.value)}
        >
          <option disabled selected>
            1 rooms, 2 guests
          </option>
          <option>Room 1</option>
        </select>
      </div>
      <button className={`btn Button`} style={buttonStyle}>
        Search
      </button>
    </div>
  );
}

export default Search;
