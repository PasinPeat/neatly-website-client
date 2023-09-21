import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import App from "../../App";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar";

function CancelSuccess() {
  // const navigate = useNavigate();
  const { bookId } = useParams();
  const [checkUser, setCheckUser] = useState(null);

  const [cancelBooking, setCancelBooking] = useState({
    room_details: {
      room_type: "",
    },
    booking_date: "",
    check_in: "",
    check_out: "",
    cancel_date: "",
    amount_stay: "",
  });

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [cancelDate, setCancelDate] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${bookId}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      setCancelBooking(data);
      setCheckIn(data.check_in);
      setCheckOut(data.check_out);
      setBookDate(data.booking_date);
      setCancelDate(data.cancel_date);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [bookId]);

  const checkInDate = new Date(`${checkIn}`);
  const checkOutDate = new Date(`${checkOut}`);
  const checkBookDate = new Date(`${bookDate}`);
  const checkCancelDate = new Date(`${cancelDate}`);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedCheckIn = checkInDate.toLocaleDateString("en-US", options);
  const formattedCheckOut = checkOutDate.toLocaleDateString("en-US", options);
  const formattedBookDate = checkBookDate.toLocaleDateString("en-US", options);
  const formattedCancelDate = checkCancelDate.toLocaleDateString(
    "en-US",
    options
  );
  //check user
  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDataFromToken = jwtDecode(token);
      const result = await axios.get(
        `http://localhost:4000/validUser/${userDataFromToken.user_id}`
      );
      setCheckUser(result);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <div className="flex flex-col items-center  bg-bg">
      {/* <Navbar /> */}
      {/* Header */}
      <div className="flex flex-col justify-center bg-green-800 rounded-t  w-[738px] h-[189px] mt-[80px] text-center">
        <p className="font-noto-serif-display text-white text-[44px] font-medium">
          The Cancellation is Complete
        </p>
        <p className="text-body2 text-green-400 text-center pt-4 px-16">
          The cancellation is complete. <br />
          You will recieve an email with a detail and refund within 48 hours.
        </p>
      </div>
      {/* body */}
      <div className="flex flex-col justify-center items-center rounded-b w-[738px] h-[318px] mb-[60px] bg-green-700 ">
        <div className="flex flex-col rounded w-[658px] h-[254px] bg-green-600 p-6">
          <p className="text-white  text-headline5">
            {cancelBooking.room_details.room_type}
          </p>
          <div className="flex flex-row pb-1 text-white  mt-4">
            <p className=" text-base font-semibold">{formattedCheckIn}</p>
            <span className="px-2 text-body1">-</span>
            <p className=" text-base font-semibold">{formattedCheckOut}</p>
          </div>
          <p className="text-white text-body1 py-1 ">
            {cancelBooking.amount_stay} Guests
          </p>
          <div className="flex flex-col text-body1 text-green-300 mt-10">
            <p className=" py-1 ">Booking date: {formattedBookDate}</p>
            <p className=" py-1 ">Cancellation date: {formattedCancelDate}</p>
          </div>
        </div>
      </div>

      {/* Button */}

      <Link to="/">
        <button className="btn Button  w-[180px] h-[48px] mb-[330px]">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
export default CancelSuccess;
