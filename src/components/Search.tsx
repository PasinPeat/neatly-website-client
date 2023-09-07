import React from "react";
import { useState } from "react";

function Search({ buttonStyle }) {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  let [room, setRoom] = useState(1);
  let [guest, setGuest] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (room === 0) return;
    if (guest === 0) return;

    const result = {
      checkInDate,
      checkOutDate,
      room,
      guest,
    };
    console.log(result);

    // setCheckIn("");
    // setCheckOut("");
    // setRoom("");
    // setGuest("");
  }

  return (
    <form onSubmit={handleSubmit}>
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
          id="datePicker"
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

          <div className="px-4 w-60 h-12 flex items-center justify-between  rounded-md border border-solid border-gray-500 text-gray-600 text-body1">
            <div>
              Rooms {room}, Guests {guest}
            </div>
            <button onClick={() => setIsOpen(!isOpen)}>o</button>
          </div>
          {isOpen && (
            <div className="px-4 py-3 w-60 top-32 flex flex-col absolute rounded-md bg-white">
              <div className="pt-2 flex items-center justify-between">
                <div>Rooms</div>
                <div className="flex items-center">
                  <button
                    style={
                      room === 26
                        ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                        : {}
                    }
                    className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                  >
                    <div
                      className="absolute bottom-[-25%] right-[10%]"
                      onClick={() => {
                        if (room < 26) {
                          room++;
                          setRoom(room);
                        }
                      }}
                    >
                      +
                    </div>
                  </button>

                  <div className="w-8 flex justify-center">{room}</div>

                  <button
                    style={
                      room < 2
                        ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                        : {}
                    }
                    className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                  >
                    <div
                      className="absolute bottom-[-25%] right-[20%]"
                      onClick={() => {
                        if (room > 1) {
                          room--;
                          setRoom(room);
                        }
                      }}
                    >
                      -
                    </div>
                  </button>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <div>Guests</div>
                <div className="flex items-center">
                  <button
                    style={
                      guest === 100
                        ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                        : {}
                    }
                    className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                  >
                    <div
                      className="absolute bottom-[-25%] right-[10%]"
                      onClick={() => {
                        if (room < 100) {
                          guest++;
                          setGuest(guest);
                        }
                      }}
                    >
                      +
                    </div>
                  </button>
                  <div className="w-8 flex justify-center">{guest}</div>

                  <button
                    style={
                      guest < 2
                        ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                        : {}
                    }
                    className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                  >
                    <div
                      className="absolute bottom-[-25%] right-[20%]"
                      onClick={() => {
                        if (guest > 1) {
                          guest--;
                          setGuest(guest);
                        }
                      }}
                    >
                      -
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className={`btn Button`} style={buttonStyle}>
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
