import React from "react";

function Search() {
  return (
    <div className="flex justify-center items-end bg-white py-10 px-[220px] drop-shadow-md border-t-[1px] border-gray-300">
      <div className="form-control">
        <label>
          <span className="text-gray-900 text-body1 pb-[4px]">Check In</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-60"
        />
      </div>
      <div className="text-gray-900 text-body1 px-6 py-4">-</div>
      <div className="form-control pr-10">
        <label>
          <span className="text-gray-900 text-body1 pb-[4px]">Check Out</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-60"
        />
      </div>
      <div className="form-control pr-10">
        <label>
          <span className="text-gray-900 text-body1 pb-[4px]">
            Room & Guest
          </span>
        </label>
        <select className="w-60 select select-bordered">
          <option disabled selected>
            1 rooms, 2 guests
          </option>
          <option>Room</option>
          <option>Guest</option>
        </select>
      </div>
      <button className="btn rounded bg-white text-orange-500 border-orange-500 border-2 px-8 py-4 capitalize font-semibold text-base hover:bg-white hover:border-orange-500">
        Search
      </button>
    </div>
  );
}

export default Search;
