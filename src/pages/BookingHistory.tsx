import { useState } from "react";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/BookingHistory/HistoryCard";
import Footer from "../components/Footer";
import BookingsContext from "../contexts/BookingContext";
import { useContext } from "react";
import RoomDetailPopup from "../components/SearchResult/RoomDetailPopup.tsx";
import { RoomsContext } from "../App.tsx";
import { RoomsProps } from "../interfaces/RoomsProps.tsx";

function BookingHistory() {
  const { bookingsHistory } = useContext(BookingsContext);
  const context = useContext(RoomsContext);

  const sortedBookingsHistory = [...bookingsHistory].sort(
    (a, b) => b.book_id - a.book_id
  );

  // find roomId
  const [rooms, setRoom] = useState<RoomsProps | null>(null);
  const [showRoomDetail, setShowRoomDetail] = useState(false);

  function handleRoomDetail(roomId: number) {
    const room = context.rooms.find((room) => room.room_id === roomId);
    if (room) {
      setRoom(room);
      setShowRoomDetail(true);
    }
  }

  /*close full image and room detail*/
  function handleClosePopup() {
    setShowRoomDetail(false);
  }

  function extractBookIds(sortedBookingsHistory) {
    return bookingsHistory.map((book) => book.book_id);
  }

  let bookIds = extractBookIds(sortedBookingsHistory);

  bookIds = bookIds.sort((a, b) => b - a);

  console.log(sortedBookingsHistory);

  return (
    <div>
      {showRoomDetail && (
        <div className="sticky z-50 top-0 flex justify-center">
          <RoomDetailPopup
            roomId={rooms.room_id}
            roomType={rooms.room_type}
            roomImages={rooms.room_images}
            bedType={rooms.bed_types}
            description={rooms.description}
            area={rooms.area}
            price={rooms.price}
            promotionPrice={rooms.promotion_price}
            amenity={rooms.amenity}
            person={rooms.person}
            available={rooms.available}
            onClosePopup={handleClosePopup}
          />
        </div>
      )}

      <Navbar />
      <div className="bg-bg pt-16 pb-32">
        {sortedBookingsHistory.map((book: any, index: number) => (
          <HistoryCard
            bookingsHistory={sortedBookingsHistory}
            cardKey={index}
            bookIds={bookIds}
            bookId={book.book_id}
            bookDate={book.booking_date}
            checkIn={book.check_in}
            checkOut={book.check_out}
            roomId={book.room_id}
            userId={book.user_id}
            totalPrice={book.total_price}
            standard={book.standard_request}
            special={book.special_request}
            additional={book.additional_request}
            onRoomDetail={handleRoomDetail}
            roomType={book.room_details.room_type}
            roomImages={book.room_details.room_images}
            price={book.room_details.price}
            person={book.room_details.person}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default BookingHistory;
