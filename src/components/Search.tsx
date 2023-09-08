import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search({ buttonStyle, onSearchResult }) {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  let [room, setRoom] = useState(1);
  let [person, setPerson] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (room === 0) return;
    if (person === 0) return;

    const result = {
      checkInDate,
      checkOutDate,
      room,
      person,
    };
    console.log(result);
    onSearchResult(result);

    // setCheckIn("");
    // setCheckOut("");
    // setRoom("");
    // setperson("");
  }

  return (
    <form onSubmit={handleSubmit} onClick={() => navigate("/search")}>
      <div className="flex justify-center items-end">
        <div className="form-control">
          <label className="label">
            <span className="text-gray-900 text-body1">Check In</span>
          </label>
          <input
            type="date"
            id="datePicker"
            placeholder="Type here"
            className="input input-bordered w-60 text-gray-600 focus:outline-0"
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
            className="input input-bordered w-60 text-gray-600 focus:outline-0"
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
              Rooms {room}, Guests {person}
            </div>
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow_drop_down_black_24dp%202.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93X2Ryb3BfZG93bl9ibGFja18yNGRwIDIuc3ZnIiwiaWF0IjoxNjk0MDgyNzE5LCJleHAiOjE3MjU2MTg3MTl9.8aoooHCf3UW3mfKGTeBYHLZbuUsFc8lpg9037s3QFnA&t=2023-09-07T10%3A31%3A58.813Z" />
            </button>
          </div>
          {isOpen && (
            <div className="px-4 py-3 w-60 top-34 flex flex-col absolute rounded-md bg-white drop-shadow-lg">
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
                      person === 100
                        ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                        : {}
                    }
                    className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                  >
                    <div
                      className="absolute bottom-[-25%] right-[10%]"
                      onClick={() => {
                        if (room < 100) {
                          person++;
                          setPerson(person);
                        }
                      }}
                    >
                      +
                    </div>
                  </button>
                  <div className="w-8 flex justify-center">{person}</div>

                  <button
                    style={
                      person < 2
                        ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                        : {}
                    }
                    className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                  >
                    <div
                      className="absolute bottom-[-25%] right-[20%]"
                      onClick={() => {
                        if (person > 1) {
                          person--;
                          setPerson(person);
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
