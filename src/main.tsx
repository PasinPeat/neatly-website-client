import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import jwtInterceptor from "./utils/jwtInterceptor.tsx";
import { AuthProvider } from "./contexts/authen.jsx";
<<<<<<< Updated upstream
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
=======
import { BrowserRouter } from "react-router-dom";
>>>>>>> Stashed changes

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
<<<<<<< Updated upstream
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
      </LocalizationProvider> 
=======
      <BrowserRouter>
        <App />
      </BrowserRouter>
>>>>>>> Stashed changes
    </AuthProvider>
  </React.StrictMode>
);
