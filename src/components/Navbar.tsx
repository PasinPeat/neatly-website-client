import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useAuth } from "../contexts/authen.jsx";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { logout } = useAuth();
  //@ts-ignore

  const linkHomePage = () => {
    navigate("/");
  };

  const linkLogin = () => {
    navigate("/login");
  };

  if (location.pathname === "/") {
    return (
      <div className="sticky z-50 top-0 flex justify-between bg-white h-[100px] w-full px-40">
        <div className="flex flex-row items-center ">
          <button onClick={linkHomePage}>
            <img
              className="h-11"
              alt="logo"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyBjb2xvci5zdmciLCJpYXQiOjE2OTM1NTQ1NzgsImV4cCI6MTcyNTA5MDU3OH0.XvlMNW7d055OdT9qXJ5FFOGAOm6r_Kz3stsZXlfV0e8&t=2023-09-01T07%3A49%3A37.938ZLogo"
            ></img>
          </button>
          <ul className="ml-12 flex text-body2">
            <li className="px-6 text-black">
              <Link smooth to="#about">
                About Neatly
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link smooth to="#services">
                Service & Facilities
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link smooth to="#roomSuits">
                Rooms & Suits
              </Link>
            </li>
          </ul>
        </div>
        {auth.isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            hello
          </button>
        ) : (
          <div className="flex flex-row items-center">
            <button
              className="px-6 text-body2 text-orange-500"
              onClick={linkLogin}
            >
              Log in
            </button>
            <button className="btn Button px-8">
              <Link
                smooth
                to="#book"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Book Now
              </Link>
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex justify-between bg-white h-[100px] w-full px-40">
        <div className="flex flex-row items-center ">
          <button onClick={linkHomePage}>
            <img
              className="h-11"
              alt="logo"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyBjb2xvci5zdmciLCJpYXQiOjE2OTM1NTQ1NzgsImV4cCI6MTcyNTA5MDU3OH0.XvlMNW7d055OdT9qXJ5FFOGAOm6r_Kz3stsZXlfV0e8&t=2023-09-01T07%3A49%3A37.938ZLogo"
            ></img>
          </button>
          <ul className="ml-12 flex text-body2">
            <li className="px-6 text-black">
              <Link
                smooth
                to="#about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                About Neatly
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link
                smooth
                to="#services"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Service & Facilities
              </Link>
            </li>
            <li className="px-6 text-black">
              <Link
                smooth
                to="#roomSuits"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Rooms & Suits
              </Link>
            </li>
          </ul>
        </div>
        {auth.isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            hello
          </button>
        ) : (
          <div className="flex flex-row items-center">
            <button
              className="px-6 text-body2 text-orange-500"
              onClick={linkLogin}
            >
              Log in
            </button>
            <button className="btn Button px-8">
              <Link
                smooth
                to="#book"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Book Now
              </Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
