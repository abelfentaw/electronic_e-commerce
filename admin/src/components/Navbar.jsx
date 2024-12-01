import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(13%,80px)]" src={assets.logo} alt="" />
      <button
        onClick={setToken}
        className="bg-gray-600 text-white px-5 py-2 m:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        type="button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
