import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface RouteParams {
  profileID: string;
}

function Profile() {
  const params = useParams<RouteParams>();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    birthDate: "",
    country: "",
  });

  const getProfileID = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/${params.profileID}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileID();
  }, [params.profileID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/profile/${params.profileID}`,
        user
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value, // อัพเดต property ของ user object ตามชื่อของฟิลด์
    });
  };

  return (
    <div className="flex flex-col items-center w-screen  bg-bg">
      <Navbar />
      <div className="flex flex-col w-[70%] ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between  mt-[80px] items-center">
            <h1 className="font-noto-serif-display text-[68px]  font-medium text-green-800">
              Profile
            </h1>
            <button className="btn Button w-[176px] h-[48px]" type="submit">
              Update Profile
            </button>
          </div>
          <p className="text-headline5 mt-[58px] mb-[38px] text-gray-600">
            Basic Information
          </p>
          <div>
            <label htmlFor="fullName">
              <p className="font-body1 text-gray-900 mb-[4px]">Full Name</p>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your name and lastname"
              className="w-full Input mb-[38px] text-black "
              value={user.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-x-[22px] mb-[38px]">
            <div>
              <label htmlFor="email">
                <p className="font-body1 text-gray-900  mb-[4px]">Email</p>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full Input mb-[38px] text-black"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="birthday">
                <p className="font-body1 text-gray-900  mb-[4px]">
                  Date of Birth
                </p>
              </label>
              <input
                id="birthday"
                type="date"
                name="birthDate"
                placeholder="Select your date of birth"
                className="w-full Input mb-[38px] text-black"
                value={user.birthDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="idNumber">
                <p className="font-body1 text-gray-900  mb-[4px]">ID Number</p>
              </label>
              <input
                id="idNumber"
                type="number"
                name="idNumber"
                pattern="\d*"
                placeholder="Enter your ID Number"
                className="w-full Input mb-[38px] text-black"
                value={user.idNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="country">
                <p className="font-body1 text-gray-900  mb-[4px]">Country</p>
              </label>
              <select
                id="country"
                name="country"
                placeholder="Select your country"
                value={user.country}
                onChange={handleChange}
                className="w-full Input h-[45%] mb-[38px] text-black"
              >
                <option value="Select your country">Select your country</option>
                <option value="Thailand">Thailand</option>
                <option value="Germany">Germany</option>
                <option value="Norway">Norway</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
              </select>
            </div>
          </div>
          <div className="h-[2px] bg-gray-300 mb-[38px]" />

          <div className="flex flex-col items-start">
            <p className="text-headline5 mb-[38px] text-gray-600 ">
              Profile Picture
            </p>
            <div>
              <button className="w-[197px] h-[167px] border-2 bg-gray-200 rounded mb-[165px]">
                <p className=" text-sm font-medium text-orange-500">
                  + <br />
                  Upload photo
                </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
