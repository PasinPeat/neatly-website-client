import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import PriceDetails from "./PriceDetails";
function BookingDetails({ bookId, onCompleteChange }) {
  const [bookingDetails, setBookingDetails] = useState({
    room_details: {
      room_type: "",
      bed_types: "",
      price: "",
    },
    booking_date: "",
    check_in: "",
    check_out: "",
    amount_stay: "",
    amount_room: "",
    amount_night: "",
    additional_request: "",
    total_price_add_reqs: "",
    three_credit_card_num: "",
    users: {
      fullName: "",
    },
  });

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookDate, setBookDate] = useState("");
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

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${bookId}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      setBookingDetails(data);
      setCheckIn(data.check_in);
      setCheckOut(data.check_out);
      setBookDate(data.booking_date);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = () => {
    onCompleteChange(false);
  };
  useEffect(() => {
    getData();
  }, [bookId]);

  return (
    <div className="flex flex-col items-center  bg-bg">
      <div className="flex flex-row justify-center items-center w-screen   border-b border-gray-300 mb-10 h-20 text-gray-900  bg-white ">
        <div className="flex flex-row justify-start w-[1080px]">
          <button onClick={handleRedirect}>
            <img
              className=" w-6 h-6 object-cover"
              src={
                "https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow_back.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93X2JhY2suc3ZnIiwiaWF0IjoxNjk1NjEwMTA3LCJleHAiOjE3MjcxNDYxMDd9.5pFAVVw_MP8pak862Mc_H7VAiI5GEc3RK7m0c9Xpn_Y&t=2023-09-25T02%3A48%3A26.394Z"
              }
              alt="arrow_back"
            />
          </button>

          <p className="mx-4 text-headline5">{bookingDetails.users.fullName}</p>
          <p className="font-normal text-[20px] leading-[30px]">
            {" "}
            {bookingDetails.room_details.room_type}{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center rounded border border-gray-300 bg-white mb-[60px] w-[1080px] ">
        <div className="flex flex-col mt-[38px] mb-[38px] pb-1 w-[880px] h-[58px]">
          <p className="text-headline5 text-gray-600">Customer name</p>
          <p className="text-body1 text-black ">
            {bookingDetails.users.fullName}{" "}
          </p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Guest(s)</p>
          <p className="text-body1 text-black ">{bookingDetails.amount_stay}</p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Room type</p>
          <p className="text-body1 text-black ">
            {bookingDetails.room_details.room_type} Room
          </p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Amount</p>
          <p className="text-body1 text-black ">
            {bookingDetails.amount_room} room
          </p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Bed type</p>
          <p className="text-body1 text-black ">
            {bookingDetails.room_details.bed_types}
          </p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Check-in</p>
          <p className="text-body1 text-black ">{formattedCheckIn}</p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Check-out</p>
          <p className="text-body1 text-black ">{formattedCheckOut}</p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Stay (total)</p>
          <p className="text-body1 text-black ">
            {bookingDetails.amount_night} night
          </p>
        </div>
        <div className="flex flex-col w-[880px] h-[58px]  mb-[38px] pb-1">
          <p className="text-headline5 text-gray-600">Booking date</p>
          <p className="text-body1 text-black ">{formattedBookDate}</p>
        </div>

        <PriceDetails bookId={bookId} />

        <div className="flex flex-col justify-center items-center text-gray-700 mb-[38px] w-[920px] h-[88px] rounded bg-gray-300">
          <div className="w-[872px]  ">
            <p className="text-body1 font-semibold pb-2">Additional Request</p>
            <p className="text-body1">
              {bookingDetails.additional_request
                ? bookingDetails.additional_request
                : "No additional Request"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
