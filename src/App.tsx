import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomDetail from "./pages/RoomDetail";
import SearchResult from "./pages/SearchResult";
function App() {
  return (
    <>
      <Home/>
      <RoomDetail/>
      <SearchResult/>
      <Login/>
      <Register/>
    </>
  );
}

export default App;
