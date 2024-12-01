import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./Pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./pages/Login";
import Placeorder from "./Pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./Pages/Verify";
import Profile from "./Pages/Profile";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
