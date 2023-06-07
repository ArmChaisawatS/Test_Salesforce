import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <MyRoute />
    </BrowserRouter>
  );
}

function MyRoute() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  useEffect(() => {
    if (location.pathname === "/signup") {
      if (token) {
       return nav("/profile")
      }else{
       return nav("/signup")
      }
    } else if (location.pathname !== "/") {
      if (!token || token === undefined || token === null) {
        localStorage.removeItem("token");
        localStorage.removeItem("LogedIn");
        localStorage.removeItem("username");
        return nav("/")
      } else {
        return nav("/profile")
      }
    } else {
      if (token) {
       return nav("/profile")
      }else{
       return nav("/")
      }
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
