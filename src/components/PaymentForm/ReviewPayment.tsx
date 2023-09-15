import { Link } from "react-router-dom";
import { useContext } from "react";
import { RoomsContext } from "../../App.tsx";

function ReviewPayment() {
  const context = useContext(RoomsContext);
  const userInput = context.userInput;

  return (
    <div className="w-[738px] flex flex-col">
      {/* Header */}
      <div className="bg-green-800 px-6 py-10 text-center">
        <p className="font-noto-serif-display text-white text-[44px] font-medium">
          Thank you for booking
        </p>
        <p className="text-body2 text-green-400 text-center px-16">
          We are looking forward to hosting you at our place. <br />
          We will send you more information about check-in and staying at our
          Neatly closer to your date of reservation
        </p>
      </div>
      {/* body */}
      <div className="bg-green-700 flex flex-col px-10 pb-10">
        <div className="bg-green-600 flex justify-between rounded mt-6 p-6 text-white">
          <div>
            <div className="flex">
              <p className="text-white text-base font-semibold">
                Th, 19 Oct 2022
              </p>
              <span className="px-2 text-body1">-</span>
              <p className="text-white text-base font-semibold">
                Fri, 20 Oct 2022
              </p>
            </div>
            <p className="text-white text-body1">2 Guests</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-white text-base font-semibold">Check-in</p>
              <p className="text-white text-body1">After 2:00 PM</p>
            </div>
            <div>
              <p className="text-white text-base font-semibold">Check-out</p>
              <p className="text-white text-body1">Before 12:00 PM</p>
            </div>
          </div>
        </div>
        <div className="text-green-300 text-body1">
          <div className="py-10 text-right">
            <span>Payment success via</span>
            <span className="text-white text-base font-semibold pl-4">
              Credit Card - *888
            </span>
          </div>
          <div className="flex justify-between py-3">
            {/* room_type */}
            <p>Superior Garden View Room</p>
            <p className="text-white text-base font-semibold">
              {userInput.price}
            </p>
          </div>
          <div className="flex justify-between py-3 mb-4">
            {/* speacial request */}
            <p>Airport tranfer</p>
            <p className="text-white text-base font-semibold">200.00</p>
          </div>
          <hr className="border-t-2 border-green-600" />
          <div className="flex justify-between pt-6">
            <p>Total</p>
            <p className="text-white text-headline5">THB </p>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="flex gap-10 pt-14 justify-center">
        <button className="text-orange-500 text-base font-semibold">
          Check Booking Detail
        </button>
        <Link to="/">
          <button className="Button px-8 py-4 w-48">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ReviewPayment;
