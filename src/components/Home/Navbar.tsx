import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between bg-white h-[100px] w-full px-40">
      <div className="flex flex-row items-center">
        <img
          className="h-11"
          alt="logo"
          src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyBjb2xvci5zdmciLCJpYXQiOjE2OTM1NTQ1NzgsImV4cCI6MTcyNTA5MDU3OH0.XvlMNW7d055OdT9qXJ5FFOGAOm6r_Kz3stsZXlfV0e8&t=2023-09-01T07%3A49%3A37.938ZLogo"
        ></img>
        <ul className="ml-12 flex text-body2">
          <li className="px-6">About Neatly</li>
          <li className="px-6">Service & Facilities</li>
          <li className="px-6">Rooms & Suits</li>
        </ul>
      </div>
      <div className="flex flex-row items-center">
        <div className="px-6 text-body2">Log in</div>
        <button className="btn Button px-8">Book Now</button>
      </div>
    </div>
  );
}

export default Navbar;
