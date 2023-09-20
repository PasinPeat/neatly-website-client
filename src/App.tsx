import "./App.css";
import React from "react";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import RoomDetail from "./pages/RoomDetail.tsx";
import Payment from "./pages/Payment.tsx";
import Profile from "./pages/Profile.tsx";
import PaymentMethod from "./pages/PaymentMethod.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import NotFound from "./pages/NotFound.tsx";
import ChangeDate from "./pages/ChangeDate.tsx";
import Refund from "./pages/Refund.tsx";
import CancleBooking from "./pages/CancelBooking.tsx";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { RoomsProps } from "./interfaces/RoomsProps.tsx";
import BookingHistory from "./pages/BookingHistory.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/authen.jsx";
import { BookingsProvider } from "./contexts/BookingContext.jsx";
export const RoomsContext = React.createContext();

function App() {
  const [rooms, setRooms] = useState<RoomsProps[]>([]);
  const [roomResult, setRoomResult] = useState<RoomsProps[]>([]);
  const [userInput, setUserInput] = useState<RoomsProps | null>(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const getRooms = async () => {
    const results = await axios(`http://localhost:4000/room`);
    setRooms(results.data.data);
  };

  useEffect(() => {
    const storedUserInput = localStorage.getItem("userInput");

    if (storedUserInput) {
      setUserInput(JSON.parse(storedUserInput));
    }
    // Fetch rooms
    getRooms();
  }, []);

  const handleSearchResult = async (result) => {
    try {
      const results = await axios.get(
        `http://localhost:4000/avaliable?checkInDate=${result.checkInDate}`
      );
      setRooms(results.data.data);

      const updatedRooms = [...rooms];

      updatedRooms.forEach((room) => {
        room.available = 0;
        room.disabled = false;
      });

      results.data.forEach((roomAvaliable) => {
        const { room_id, status } = roomAvaliable;

        if (results.data) {
          const roomToUpdate = updatedRooms.find(
            (room) => room.room_id === room_id
          );
          if (roomToUpdate) {
            roomToUpdate.available += 1;
          }
        }
      });

      updatedRooms.forEach((room) => {
        if (result.person > room.person) {
          room.available = 0;
        }
      });

      updatedRooms.forEach((room) => {
        if (room.person < result.person || room.available === 0) {
          room.disabled = true;
        }
      });

      setRooms(updatedRooms);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BookingsProvider>
      <RoomsContext.Provider
        value={{
          rooms,
          userInput,
          setUserInput,
          showUpdateButton,
          setShowUpdateButton,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setUserInput={setUserInput}
                onSearchResult={handleSearchResult}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
          <Route
            path="/search"
            element={
              <SearchResult
                roomResult={roomResult}
                userInput={userInput}
                setUserInput={setUserInput}
                onSearchResult={handleSearchResult}
                setRoomResult={setRoomResult}
              />
            }
          />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/paymentmethod/:paymentmethodID"
            element={<PaymentMethod />}
          />
          <Route path="/profile/:profileID" element={<Profile />} />
          <Route path="/booking/user/:userId" element={<BookingHistory />} />
          <Route path="/changeDate/:bookId" element={<ChangeDate />} />
          <Route path="/refund/:bookId" element={<Refund />} />
          <Route path="/cancleBooking/:bookId" element={<CancleBooking />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </RoomsContext.Provider>
    </BookingsProvider>
  );
}

export default App;
