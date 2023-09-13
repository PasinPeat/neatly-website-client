import { useNavigate, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useAuth } from "../contexts/authen.jsx";
import { useEffect } from "react";

function Navbar() {
  //@ts-ignore
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { logout } = useAuth();

  let userProfileImage;

  if (auth.isAuthenticated && auth.state.userData) {
    userProfileImage = auth.state.userData.profile_image;
  }
  console.log(auth.state.userData);

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
          <Link smooth to="/#top">
            <button>
              <img
                className="h-11"
                alt="logo"
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyBjb2xvci5zdmciLCJpYXQiOjE2OTM1NTQ1NzgsImV4cCI6MTcyNTA5MDU3OH0.XvlMNW7d055OdT9qXJ5FFOGAOm6r_Kz3stsZXlfV0e8&t=2023-09-01T07%3A49%3A37.938ZLogo"
              ></img>
            </button>
          </Link>
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
          <div className="flex items-center">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="hover:cursor-pointer">
                <div className="w-12 h-12">
                  <img src={userProfileImage} className="rounded-full"></img>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-[4px] z-[1] drop-shadow-lg bg-base-100 w-52 mt-4 px-2 [&_li>*]:rounded-[4px]"
              >
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/profile.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3Byb2ZpbGUuc3ZnIiwiaWF0IjoxNjk0NDA0NTg3LCJleHAiOjE3MjU5NDA1ODd9.vDd8aSTyukskfIfkrxEkLxUXT4FmUzE-tprRpxC3Y2Y&t=2023-09-11T03%3A56%3A25.801Z"
                    ></img>
                    <span className="text-gray-700">Profile</span>
                  </button>
                </li>
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/credit.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdC5zdmciLCJpYXQiOjE2OTQ0MDU3MDUsImV4cCI6MTcyNTk0MTcwNX0.wwSq3XrBgaEqb4U3QeRXYhQjKItIn7FSStx40IDj7jE&t=2023-09-11T04%3A15%3A04.217Z"
                    ></img>
                    <span className="text-gray-700">Payment Method</span>
                  </button>
                </li>
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/booking_history.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Jvb2tpbmdfaGlzdG9yeS5zdmciLCJpYXQiOjE2OTQ0MDU3MzksImV4cCI6MTcyNTk0MTczOX0.8Fjox_ROepJ6S3GYITg9FKlG2s1Wzk6ahtnEXYmWnI8&t=2023-09-11T04%3A15%3A38.237Z"
                    ></img>
                    <span className="text-gray-700">Booking History</span>
                  </button>
                </li>
                <hr className="mt-2 border-gray-400"></hr>
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/logout.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2xvZ291dC5zdmciLCJpYXQiOjE2OTQ0MDUyMjcsImV4cCI6MTcyNTk0MTIyN30.QQWg08pQQG_UXibP0RzqSxor94ssvDnTFV7t5oh56QE&t=2023-09-11T04%3A07%3A05.943Z"
                    ></img>
                    <span className="text-gray-700">Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <button
              className="px-6 text-body2 text-orange-500"
              onClick={linkLogin}
            >
              Log in
            </button>
            <button
              className="btn Button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/search");
              }}
            >
              Find Room
            </button>
          </div>
        )}
      </div>
    );
  } else {
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
          <div className="flex items-center">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="hover:cursor-pointer">
                <div className="w-12 h-12">
                  <img src={userProfileImage} className="rounded-full"></img>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-[4px] z-[1] drop-shadow-lg bg-base-100 w-52 mt-4 px-2 [&_li>*]:rounded-[4px]"
              >
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/profile.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3Byb2ZpbGUuc3ZnIiwiaWF0IjoxNjk0NDA0NTg3LCJleHAiOjE3MjU5NDA1ODd9.vDd8aSTyukskfIfkrxEkLxUXT4FmUzE-tprRpxC3Y2Y&t=2023-09-11T03%3A56%3A25.801Z"
                    ></img>
                    <span className="text-gray-700">Profile</span>
                  </button>
                </li>
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/credit.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdC5zdmciLCJpYXQiOjE2OTQ0MDU3MDUsImV4cCI6MTcyNTk0MTcwNX0.wwSq3XrBgaEqb4U3QeRXYhQjKItIn7FSStx40IDj7jE&t=2023-09-11T04%3A15%3A04.217Z"
                    ></img>
                    <span className="text-gray-700">Payment Method</span>
                  </button>
                </li>
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/booking_history.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Jvb2tpbmdfaGlzdG9yeS5zdmciLCJpYXQiOjE2OTQ0MDU3MzksImV4cCI6MTcyNTk0MTczOX0.8Fjox_ROepJ6S3GYITg9FKlG2s1Wzk6ahtnEXYmWnI8&t=2023-09-11T04%3A15%3A38.237Z"
                    ></img>
                    <span className="text-gray-700">Booking History</span>
                  </button>
                </li>
                <hr className="mt-2 border-gray-400"></hr>
                <li>
                  <button className="py-2" onClick={() => logout()}>
                    <img
                      className="w-4 h-4"
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/logout.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2xvZ291dC5zdmciLCJpYXQiOjE2OTQ0MDUyMjcsImV4cCI6MTcyNTk0MTIyN30.QQWg08pQQG_UXibP0RzqSxor94ssvDnTFV7t5oh56QE&t=2023-09-11T04%3A07%3A05.943Z"
                    ></img>
                    <span className="text-gray-700">Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-cols items-center">
            <button
              className="px-6 text-body2 text-orange-500"
              onClick={linkLogin}
            >
              Log in
            </button>
            <button className="btn Button">
              <Link
                smooth
                to="#book"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/search");
                }}
              >
                Find Room
              </Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
