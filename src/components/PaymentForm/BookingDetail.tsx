import BookingsContext from "../../contexts/BookingContext";
import { useContext } from "react";

function BookingDetail() {
  const { bookings } = useContext(BookingsContext);
  console.log(bookings);
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
                <p>Th, 19 Oct 2022</p>
                <p>-</p>
                <p>Fri, 20 Oct 2022</p>
              </div>
              <div className="py-1">
                <span>2</span>
                <span> Guests</span>
              </div>
            </div>

            <div className="flex justify-between py-3 mb-4">
              <p className="text-body1 text-green-300">
                Superior Garden View Room
              </p>
              <p className="text-base font-semibold">2,500.00</p>
            </div>
          </div>
          <hr className="border-t-2 border-green-600" />
          <div className="flex justify-between pt-6">
            <p className="text-body1 text-green-300">Total</p>
            <p className="text-headline5">THB 2,500.00</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetail;
