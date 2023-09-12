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
import RoomDetailPopup from "./components/SearchResult/RoomDetailPopup.tsx";
import NotFound from "./pages/NotFound.tsx";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { RoomsProps } from "./interfaces/RoomsProps.tsx";
// import { useAuth } from "./contexts/authen.jsx";
export const RoomsContext = React.createContext();

function App() {
  // const auth = useAuth();
  const [rooms, setRooms] = useState<RoomsProps[]>([]);
  const [roomResult, setRoomResult] = useState<RoomsProps[]>([]);
  const [userInput, setUserInput] = useState<RoomsProps | null>(null);

  const getRooms = async () => {
    const results = await axios(`http://localhost:4000/room`);
    setRooms(results.data.data);
    // console.log(results);
  };

  useEffect(() => {
    getRooms();
  }, []);

  /*filter rooms*/
  function handleSearchResult(result) {
    const filteredRooms = rooms.filter((room) => room.person >= result.person);
    setRoomResult(filteredRooms);
  }

  return (
    <RoomsContext.Provider value={{ rooms }}>
      <BrowserRouter>
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
          <Route path="/login" element={<Login roomResult={roomResult} />} />
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

          <Route path="/profile/:profileID" element={<Profile />} />

          <Route
            path="/paymentmethod/:paymentmethodID"
            element={<PaymentMethod />}
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RoomsContext.Provider>
  );
}

export default App;
