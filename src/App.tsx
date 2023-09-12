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
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RoomsProps } from "./interfaces/RoomsProps.tsx";
export const RoomsContext = React.createContext();

function App() {
  const [rooms, setRooms] = useState<RoomsProps[]>([]);
  const [roomResult, setRoomResult] = useState<RoomsProps[]>([]);
  const [userInput, setUserInput] = useState<RoomsProps | null>(null);
  const [searchStateOnHome, setSearchStateOnHome] = useState({
    checkInDate: "",
    checkOutDate: "",
    room: 1,
    person: 2,
  });

  const getRooms = async () => {
    const results = await axios(`http://localhost:4000/room`);
    setRooms(results.data.data);
    // console.log(results);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const navigate = useNavigate();

  /*filter rooms*/
  function handleSearchResult(result) {
    const filteredRooms = rooms.filter((room) => room.person >= result.person);
    setRoomResult(filteredRooms);
  }

  /*transfer search state into search page*/
  function transferSearchState(prevState) {
    setSearchStateOnHome(prevState);
    // Navigate to the search result page with the updated state
    navigate("/search", { state: prevState });
  }

  return (
    <RoomsContext.Provider
      value={{ rooms, navigate, transferSearchState, searchStateOnHome }}
    >
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
