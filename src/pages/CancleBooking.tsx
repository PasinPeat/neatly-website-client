import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";

function CancleBooking() {
  return (
    <div>
      <Navbar />
      <div className="bg-bg flex flex-col items-center pt-20 pb-28">
        <h1 className="mb-12 w-[1120px] font-noto-serif-display text-headline2 font-medium text-gray-900">
          Cancle Booking
        </h1>
        <div className="w-[1120px] border-b-[1px] text-gray-700">
          <div className="flex flex-col gap-12 py-10">
            <div className="w-full flex justify-between mb-2">
              <div>
                <div className="w-[357px] h-[210px] rounded bg-cover bg-center">
                  <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/room_images/04%20Supreme/K-Studio_Lambs_Lions_CasaCookChania_022_GeorgRoske.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9yb29tX2ltYWdlcy8wNCBTdXByZW1lL0stU3R1ZGlvX0xhbWJzX0xpb25zX0Nhc2FDb29rQ2hhbmlhXzAyMl9HZW9yZ1Jvc2tlLmpwZyIsImlhdCI6MTY5NDUwODA0NSwiZXhwIjoxNzI2MDQ0MDQ1fQ.GPUAPR5qHYjoK9TqISz_AlCFcWJR0gvKKpu4gFkRw9k&t=2023-09-12T08%3A40%3A44.773Z" />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="w-[715px]">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-headline4 text-black">
                      Superior Garden View
                    </h2>
                    <p className="text-gray-600 text-body1">
                      Booking date: Tue, 16 Oct 2022
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col">
                    <div>
                      <div>
                        <span>Th, 19 Oct 2022 </span>
                        <span className="px-2">-</span>
                        <span>Th, 19 Oct 2022 </span>
                      </div>
                      <div className="mt-2">
                        <span>2 Guests</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 text-body3 text-[#B61515]">
                    *Cancellation of the booking now will not be able to request
                    a refund.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between -ml-4 pt-10 border-t-[1px] border-gray-300">
              <button
                // onClick={() => onRoomDetail(roomId)}
                className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
              >
                Cancel
              </button>
              <div className="flex">
                <div>
                  <button
                    className="btn Button"
                    onClick={() => navigate("/ChangeDate")}
                  >
                    Cancle this Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CancleBooking;
