import "./App.css";
import React from "react";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import RoomDetail from "./pages/RoomDetail.tsx";
import Payment from "./pages/Payment.tsx";
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

  const getRooms = async () => {
    const results = await axios(`http://localhost:4000/room`);
    setRooms(results.data.data);
    // console.log(results);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RoomsContext.Provider>
  );
}

export default App;
