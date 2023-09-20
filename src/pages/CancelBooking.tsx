import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";
import CancelSuccess from "../components/CancelBooking/CancelSuccess";

function CancelBooking() {
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
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

  const updateData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/booking/${bookId}`,
        { ...cancelBooking }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async () => {
    await updateData();
    setComplete(true);
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
    <div className="flex flex-col items-center w-screen bg-bg">
      <Navbar />

      <div className="flex flex-col w-[1120px]">
        {complete ? (
          <CancelSuccess />
        ) : (
          <div className="flex flex-col w-[1120px]">
            <h1 className="mt-20 mb-16 font-noto-serif-display font-medium text-[68px] leading-[85px] text-black">
              Cancel Booking
            </h1>
            <div className=" mt-10 mb-12">
              <div className="flex flex-row justify-between ">
                <div className="w-[357px] h-[210px]  bg-cover bg-center">
                  <img
                    src={cancelBooking.room_details.room_images[0]}
                    alt="Room"
                    className="rounded"
                  />
                </div>

                <div className="w-[715px]">
                  <div className="flex flex-row justify-between items-center mb-10">
                    <h2 className="text-headline4 text-black">
                      {cancelBooking.room_details.room_type}
                    </h2>
                    <p className="text-gray-600 text-body1">
                      Booking date: {formattedBookDate}
                    </p>
                  </div>

                  <div className="flex flex-col mb-8 text-gray-700 text-body1">
                    <div>
                      <div>
                        <span>{formattedCheckIn} </span>
                        <span className="px-2">-</span>
                        <span>{formattedCheckOut} </span>
                      </div>
                      <div className="mt-2">
                        <span>{cancelBooking.room_details.person} Guests</span>
                      </div>
                    </div>
                  </div>
                  <div className=" text-body3 text-[#B61515]">
                    *Cancellation of the booking now will not be able to request
                    a refund.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 border-t-[2px] border-gray-300 " />
            <div className="flex flex-row mt-12 justify-between mb-[400px]">
              <button
                className="btn capitalize   bg-bg border-none font-semibold text-[16px] leading-4 text-orange-500 hover:bg-bg"
                onClick={() => navigate("/booking/user/${userId}")}
              >
                Cancel
              </button>
              <button className="btn Button " onClick={handleCancel}>
                Cancel this Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CancelBooking;
