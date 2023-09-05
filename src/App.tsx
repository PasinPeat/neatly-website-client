import "./App.css";
import React from "react";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import RoomDetail from "./pages/RoomDetail.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
// export const RoomDetailContext = React.createContext();

interface Room {
  room_type: string;
  price: number;
  promotion_price: number;
  bed_types: string;
  area: string;
  amenity: string[];
  description: string;
  room_images: string[];
}

function App() {
  // const [rooms, setRooms] = useState<Room[]>([]);
  // const params = useParams();
  // const navigate = useNavigate();

  // const getRooms = async () => {
  //   const results = await axios(`http://localhost:4000/room/${params.roomId}`);
  //   setRooms(results.data.data);
  //   console.log(results);
  // };

  return (
    // <RoomDetailContext.Provider value={{ rooms }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room-detail" element={<RoomDetail />} />
        <Route path="/search" element={<SearchResult />} />
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    // </RoomDetailContext.Provider>
  );
}

export default App;
