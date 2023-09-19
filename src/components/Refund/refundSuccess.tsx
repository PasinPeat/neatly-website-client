import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import App from "../../App";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar";

function RefundSuccess() {
  // const navigate = useNavigate();
  const { bookId } = useParams();

  const [cancelBooking, setCancelBooking] = useState({
    room_details: {
      room_images: [],
      room_type: "",
      person: "",
    },
    booking_date: "",
    check_in: "",
    check_out: "",
  });

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookDate, setBookDate] = useState("");

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
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedCheckIn = checkInDate.toLocaleDateString("en-US", options);
  const formattedCheckOut = checkOutDate.toLocaleDateString("en-US", options);
  const formattedBookDate = checkBookDate.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-col items-center  bg-bg">
      {/* <Navbar /> */}
      {/* Header */}
      <div className="flex flex-col justify-center bg-green-800 rounded-t  w-[800px] h-[189px] mt-[80px] text-center">
        <p className="font-noto-serif-display text-white text-[44px] font-medium">
          Your Request has been Submitted
        </p>
        <p className="text-body2 text-green-400 text-center pt-4 px-16">
          The cancellation is complete. <br />
          You will recieve an email with a detail of cancellation within 24
          hours.
        </p>
      </div>
      {/* body */}
      <div className="flex flex-col justify-center items-center rounded-b w-[800px] mb-[60px] bg-green-700 ">
        <div className="flex flex-col mt-6 rounded w-[720px] h-[254px] bg-green-600 p-6">
          <p className="text-white  text-headline5">
            {cancelBooking.room_details.room_type}
          </p>
          <div className="flex flex-row pb-1 text-white  mt-4">
            <p className=" text-base font-semibold">{formattedCheckIn}</p>
            <span className="px-2 text-body1">-</span>
            <p className=" text-base font-semibold">{formattedCheckOut}</p>
          </div>
          <p className="text-white text-body1 py-1 ">
            {" "}
            {cancelBooking.room_details.person} Guests
          </p>
          <div className="flex flex-col text-body1 text-green-300 mt-10">
            <p className=" py-1 ">Booking date: {formattedBookDate}</p>
            <p className=" py-1 ">Cancellation date: Tue, 16 Oct 2022</p>
          </div>
        </div>
        <hr className=" w-[720px] mt-10 border-green-600 border-solid border-t-2" />
        <div className="flex flex-row justify-between mt-7 mb-10 w-[720px] ">
          <p className="text-green-300 text-body1">Total Refund</p>
          <p className="text-white text-headline5">THB 2,300.00</p>
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

export default RefundSuccess;