/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders"; // Ensure this path is correct
import Users from "./pages/Users";
import Edit from "./pages/Edit"; // Import the Edit component
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "ETB";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || "" // Directly retrieves the token string if available
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Save only the token string
    } else {
      localStorage.removeItem("token"); // Remove token if empty
    }
  }, [token]);

  const handleLogout = () => {
    setToken(""); // Clear the token in state and localStorage
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={handleLogout} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/users" element={<Users />} />
                <Route
                  path="/edit/:productId"
                  element={<Edit token={token} />}
                />{" "}
                {/* Add this line */}
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;