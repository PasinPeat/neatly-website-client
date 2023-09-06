import React from "react";

function Search() {
  return (
    <div
      className="py-14 flex justify-center items-end w-[1120px] rounded absolute top-72 bg-white"
      id="book"
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Check In</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-60"
        />
      </div>
      <div className="px-8 py-4">-</div>
      <div className="form-control pr-10">
        <label className="label">
          <span className="label-text">Check Out</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-60"
        />
      </div>
      <div className="pr-10">
        <label className="label">
          <span className="label-text">Room & Guest</span>
        </label>
        <select className="w-60 select select-bordered">
          <option disabled selected>
            1 rooms, 2 guests
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
      <button className="btn Button px-8">Search</button>
    </div>
  );
}

export default Search;
