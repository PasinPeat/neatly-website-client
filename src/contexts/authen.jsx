import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
    userData: null,
  });
  // useEffect(() => {
  //   // Check for a token in local storage
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     // Decode the token to obtain user data
  //     const userDataFromToken = jwtDecode(token);

  //     // Fetch additional user data using the user ID
  //     axios
  //       .get(`http://localhost:4000/validUser/${userDataFromToken.user_id}`)
  //       .then((result) => {
  //         console.log(result);

  //         setState({
  //           ...state,
  //           user: userDataFromToken,
  //           userData: result.data.user, // Assuming the data is nested under 'data'
  //           loading: false,
  //         });

  //         localStorage.setItem("userData", JSON.stringify(result.data.user));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //         setState({
  //           ...state,
  //           loading: false,
  //           error: "Error fetching user data",
  //         });
  //       });
  //   } else {
  //     const storedUserData = localStorage.getItem("userData");
  //     if (storedUserData) {
  //       setState({
  //         ...state,
  //         user: jwtDecode(token),
  //         userData: JSON.parse(storedUserData),
  //         loading: false,
  //       });
  //     } else {
  //       setState({
  //         ...state,
  //         loading: false,
  //       });
  //     }
  //   }
  // }, []);

  // make a login request
  const login = async (data) => {
    const result = await axios.post("http://localhost:4000/auth/login", data);
    const token = result.data.token;
    localStorage.setItem("token", token);
    const userData = result.data.userData;
    const userDataFromToken = jwtDecode(token);
    console.log(userDataFromToken);
    setState({
      ...state,
      user: userDataFromToken,
      userData: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null, error: null });
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ state, login, logout, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
