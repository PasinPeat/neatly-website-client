import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDownList from "./DropdownList.js";

function HistoryCard({
  bookingsHistory,
  bookIds,
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
  const [timeRemaining, setTimeRemaining] = useState(false);
  const [buttonVisibilities, setButtonVisibilities] = useState({});

  const navigate = useNavigate();

  // date format
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
    const currentDate = new Date();
    const millisecondsIn24Hours = 24 * 60 * 60 * 1000;

    const updatedButtonVisibilities = {};

    bookIds.forEach((id) => {
      const book = bookingsHistory.find((book) => book.book_id === id);
      if (book) {
        const checkInDateCheck = new Date(book.check_in);

        if (checkInDateCheck < currentDate) {
          updatedButtonVisibilities[id] = false;
        } else {
          const timeDifference = Math.abs(checkInDateCheck - currentDate);
          if (timeDifference < millisecondsIn24Hours) {
            updatedButtonVisibilities[id] = false;
          } else {
            updatedButtonVisibilities[id] = true;
          }
        }
      }
    });

    setButtonVisibilities(updatedButtonVisibilities);
  }, [bookIds, bookingsHistory]);

  const handleClickChangeDate = () => {
    if (timeRemaining === true) {
      navigate(`/ChangeDate/${bookId}`);
    } else {
      setButtonVisibilities({ ...buttonVisibilities, [bookId]: true });
    }
  };

  const handleClickCancel = () => {
    if (timeRemaining === true) {
      navigate("/Cancel");
    } else {
      setButtonVisibilities({ ...buttonVisibilities, [bookId]: true });
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
                    <span> After 2:00 PM</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-grey-800">Check-out</p>
                  <div>
                    <span>{formattedCheckOut}</span>
                    <span> |</span>
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
                  {buttonVisibilities[bookId] && (
                    <button
                      className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
                      onClick={() => handleClickCancel()}
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
                  {buttonVisibilities[bookId] && (
                    <button
                      className="btn Button"
                      onClick={() => handleClickChangeDate()}
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
