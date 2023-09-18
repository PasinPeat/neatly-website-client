import { useContext } from "react";
import { RoomsContext } from "../../App";
import { PaymentContext } from "../../pages/Payment";
import dayjs from "dayjs";
// import useFormattedDate from "../../hooks/useFormattedDate";

function BookingDetail() {
  //  const formatdate = useFormattedDate(date);
  const roomsContext = useContext(RoomsContext);
  const userInput = roomsContext.userInput;

  const checkInDate = userInput.checkInDate;
  const checkOutDate = userInput.checkOutDate;

  const paymentContext = useContext(PaymentContext);
  const totalPriceAfterAddReqs = paymentContext.totalPriceAfterAddReqs;
  const selectedStandard = paymentContext.selectedStandard;
  const selectedSpecial = paymentContext.selectedSpecial;
  const additional = paymentContext.additional;

  function formattedDate(date) {
    return dayjs(date).format("dd, DD-MM-YYYY");
  }

  const formattedCheckInDate = formattedDate(checkInDate);
  const formattedCheckOutDate = formattedDate(checkOutDate);

  return (
    <>
      <div className="w-[358px] text-white ">
        <div className="bg-green-800 px-6 py-4 flex gap-3 rounded-t-md">
          <img
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/booking_history.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Jvb2tpbmdfaGlzdG9yeS5zdmciLCJpYXQiOjE2OTQ0MTA1NjMsImV4cCI6MTcyNTk0NjU2M30.Lrqw0_-U-7cOVDXXwgX0mbFuVMbnBQ_PT4PbXIfx1k0&t=2023-09-11T05%3A36%3A06.606Z"
            className="w-6 h-6"
          />
          <p className="text-headline5">Booking Detail</p>
        </div>

        <div className="bg-green-700 p-6 rounded-b-md">
          <div className="flex flex-col gap-10">
            <div className="flex gap-10">
              <div>
                <p className="text-base font-semibold pb-2">Check-in</p>
                <p className="text-body1">After 2:00 PM</p>
              </div>
              <div>
                <p className="text-base font-semibold pb-2">Check-out</p>
                <p className="text-body1">Before 12:00 PM</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-2 text-body1">
                <p>{formattedCheckInDate}</p>
                <p>-</p>
                <p>{formattedCheckOutDate}</p>
              </div>
              <div className="flex gap-[77px]">
                <div className="py-1">
                  <span>{userInput.person}</span>
                  <span> {userInput.person > 1 ? `Guests` : `Guest`}</span>
                </div>
                <div className="py-1">
                  <span>{userInput.room}</span>
                  <span> {userInput.room > 1 ? `Rooms` : `Room`}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between py-3">
                <p className="text-body1 text-green-300">
                  {userInput.roomType}
                </p>
                <p className="text-base font-semibold">
                  {userInput.pricePerNight
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "THB",
                    })
                    .replace("THB", "")}
                </p>
              </div>
              {selectedStandard &&
                selectedStandard.map((request) => {
                  return (
                    <div
                      className="flex justify-between py-3"
                      key={request.name}
                    >
                      <p className="text-body1 text-green-300">
                        {request.name}
                      </p>
                    </div>
                  );
                })}
              {selectedSpecial &&
                selectedSpecial.map((request) => {
                  return (
                    <div
                      className="flex justify-between py-3"
                      key={request.name}
                    >
                      <p className="text-body1 text-green-300">
                        {request.name}
                      </p>
                      <p className="text-base font-semibold">
                        {request.price
                          .toLocaleString("en-US", {
                            style: "currency",
                            currency: "THB",
                          })
                          .replace("THB", "")}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          {additional && (
            <div className="mb-4 py-3 text-body1 text-base">{additional}</div>
          )}

          <hr className="border-t-2 border-green-600" />
          <div className="flex justify-between pt-6">
            <p className="text-body1 text-green-300">Total</p>
            <p className="text-headline5">
              {totalPriceAfterAddReqs.toLocaleString("en-US", {
                style: "currency",
                currency: "THB",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetail;
