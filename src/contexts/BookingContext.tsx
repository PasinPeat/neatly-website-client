import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authen";
import Loader from "../components/Loader";

const BookingsContext = createContext();

export function BookingsProvider({ children }: any) {
  const [bookingsHistory, setBookingsHistory] = useState([]);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // console.log(bookingsHistory);

  const getBookingsHistory = async () => {
    const userId = auth.state.userData.id;
    try {
      const results = await axios(
        `http://localhost:4000/booking/user/${userId}`
      );

      setBookingsHistory(results.data.data);
      // console.log(bookingsHistory);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    getBookingsHistory().then(() => {
      setIsLoading(false);
    });
  }, [auth.state.userData]);

  return (
    <BookingsContext.Provider value={{ bookingsHistory }}>
      {isLoading ? <Loader /> : <>{children}</>}
    </BookingsContext.Provider>
  );
}

export default BookingsContext;
