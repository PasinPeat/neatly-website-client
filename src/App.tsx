import "./App.css";
import React from "react";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import RoomDetail from "./pages/RoomDetail.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import RoomDetailPopup from "./components/RoomDetailPopup.tsx";
import NotFound from "./pages/NotFound.tsx";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RoomsProps } from "./interfaces/RoomsProps.tsx";
export const RoomsContext = React.createContext();

function App() {
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
          <Route path="/*" element={<NotFound />} />
          <Route path="/popup" element={<RoomDetailPopup />} />
        </Routes>
      </BrowserRouter>
    </RoomsContext.Provider>
  );
}

export default App;
