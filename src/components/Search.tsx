import React from "react";

function Search() {
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
        />
      </div>
      <div className="pr-10">
        <label className="label">
          <span className="text-gray-900 text-body1">Rooms & Guests</span>
        </label>
        <select className="w-60 select select-bordered text-gray-600 text-body1">
          <option disabled selected>
            1 rooms, 2 guests
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
      <button className="btn Button">Search</button>
    </div>
  );
}

export default Search;
