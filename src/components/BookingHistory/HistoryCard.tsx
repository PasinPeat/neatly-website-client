import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDownList from "./DropdownList.js";

function HistoryCard({
  bookId,
  bookDate,
  checkIn,
  checkOut,
  roomId,
  userId,
  totalPrice,
  standard,
  special,
  additional,
  onRoomDetail,
  roomType,
  roomImages,
  price,
  person,
}: any) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(true);

  const navigate = useNavigate();

  // date formatt
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

  const backgroundImage = {
    backgroundImage: `url('${roomImages[2]}')`,
  };

  /*check time*/
  useEffect(() => {
    checkTimeRemaining();
    // ตรวจสอบเวลาที่เหลือทุกๆ 1 นาที
    const intervalId = setInterval(() => {
      checkTimeRemaining();
      if (timeRemaining < 24 * 60 * 60 * 1000) {
        clearInterval(intervalId);
        setButtonVisible(false);
      }
    }, 60000); // 1 mins = 60,000 ms
  }, []);

  function checkTimeRemaining() {
    const currentTime = new Date();
    const timeDifference = bookDate - currentTime;
    setTimeRemaining(timeDifference);
  }

  const handleClickChangeDate = () => {
    if (timeRemaining >= 24 * 60 * 60 * 1000) {
      navigate("/ChangeDate");
    } else {
      setButtonVisible(true);
    }
  };

  const handleClickCancel = () => {
    if (timeRemaining >= 24 * 60 * 60 * 1000) {
      navigate("/Cancel");
    } else {
      setButtonVisible(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full bg-bg text-gray-700">
        <div className=" flex flex-col pt-10 border-b-[1px] border-gray-300">
          <div className="w-[1120px] flex justify-between">
            <div
              style={backgroundImage}
              className="w-[357px] h-[210px] rounded bg-cover bg-center"
            ></div>
            <div className="flex flex-col py-6 justify-between w-[715px]">
              <div className="flex flex-row justify-between items-center mb-5">
                <h2 className="text-headline4 text-black">{roomType}</h2>
                <p className="text-body1">
                  Booking date: <span>{formattedBookDate}</span>
                </p>
              </div>
              <div className=" flex gap-10">
                <div className="flex flex-col gap-1">
                  <p className=" font-bold text-grey-800">Check-in</p>
                  <div>
                    <span>{formattedCheckIn}</span>
                    <span> |</span>
                    {/* fix: fix to fetch *After* from detabase */}
                    <span> After 2:00 PM</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-grey-800">Check-out</p>
                  <div>
                    <span>{formattedCheckOut}</span>
                    <span> |</span>
                    {/* fix: fix to fetch *Before* from detabase */}
                    <span> Before 12:00 PM</span>
                  </div>
                </div>
              </div>
              <DropDownList
                totalPrice={totalPrice}
                standard={standard}
                special={special}
                additional={additional}
                roomType={roomType}
                price={price}
                person={person}
              />
              <div className="flex justify-between -ml-4 pt-5">
                <div className="flex items-start">
                  {buttonVisible && (
                    <button
                      className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
                      onClick={handleClickCancel}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => onRoomDetail(roomId)}
                    className="btn capitalize bg-bg border-none font-semibold text-body1 text-base  text-orange-500 hover:bg-bg"
                  >
                    Room Detail
                  </button>
                  {buttonVisible && (
                    <button
                      className="btn Button"
                      onClick={handleClickChangeDate}
                    >
                      Change Date
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryCard;
