import { Link } from "react-router-dom";

function RefundSuccess() {
  return (
    <div className="w-[738px] flex flex-col">
      {/* Header */}
      <div className="bg-green-800 px-6 py-10 text-center">
        <p className="font-noto-serif-display text-white text-headline3 font-medium">
          Your Request has been submitted
        </p>
        <p className="text-body2 text-green-400 text-center py-4">
          This cancellation is complete. <br />
          You will receive an email with a detail and refund within 48 hours.
        </p>
      </div>
      {/* body */}
      <div className="bg-green-700 flex flex-col px-10 pb-10">
        <div className="bg-green-600 flex justify-between rounded mt-6 p-6 text-white">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-headline4 text-black">Superior Garden View</h2>
            <p className="text-gray-600 text-body1">
              Booking date: Tue, 16 Oct 2022
            </p>
          </div>
        </div>

        <div className="text-green-300 text-body1">
          <hr className="border-t-2 border-green-600" />
          <div className="flex justify-between pt-6">
            <p>Total</p>
            <p className="text-white text-headline5">THB 2,300.00</p>
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

export default RefundSuccess;
