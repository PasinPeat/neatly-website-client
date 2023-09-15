import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authen";

const BookingsContext = createContext();

// interface Booking {
//   book_id: number;
//   booking_date: string;
//   amount_room: number;
//   amount_stay: number;
//   check_in: string;
//   check_out: string;
//   room_id: number;
//   user_id: number;
//   total_price: string;
//   update_booking_date: string;
//   standard_request: string[];
//   special_request: string[];
//   additional_request: string;
//   room_avaliable_id: number;
// }

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [bookingsHistory, setBookingsHistory] = useState([]);

  const auth = useAuth();

  // BookingId
  const getBookings = async () => {
    try {
      const results = await axios(`http://localhost:4000/booking`);

      setBookings(results.data.data);
      console.log(bookings);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  function findBookingId(): number {
    const userId = auth.state.userData.id;
    const selectedBooking = bookings.find((book) => book.user_id === userId);
    console.log(selectedBooking);
    const bookId = selectedBooking.book_id;
    return bookId;
  }

  // Bookings History
  const getBookingsHistory = async () => {
    try {
      const results = await axios(
        `http://localhost:4000/booking/user/${auth.state.userData.id}`
      );

      setBookingsHistory(results.data.data);
      console.log(bookingsHistory);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    findBookingId();
  }, []);

  useEffect(() => {
    getBookingsHistory();
  }, [auth.state.userData.id]);

  return (
    <BookingsContext.Provider value={{ bookId, bookings, bookingsHistory }}>
      {children}
    </BookingsContext.Provider>
  );
}

export default BookingsContext;
