import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    getCartCount,
    setShowSearch,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const handleToggle = () => {
    setVisible((prev) => !prev);
  };

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className="flex flex-col items-center gap-1"
      onClick={() => setVisible(false)}>
      <p>{children}</p>
      <hr className="w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
    </NavLink>
  );

  return (
    <nav className="flex items-center justify-between py-5 font-medium md:sticky top-0 bg-white">
      <NavLink to="/" className="logo">
        <img src={assets.logo} className="w-36 " alt="Logo" />
      </NavLink>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/collection">Collections</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </ul>

      <div className="flex items-center gap-6">
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />
          {/* dropdown menu*/}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer hover:text-black">
                  My profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black">
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount() || 0}
          </p>
        </Link>
        <img
          onClick={handleToggle}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}>
        <div className="flex flex-col text-gray-600">
          <div
            onClick={handleToggle}
            className="flex items-center gap-4 p-3 cursor-pointer">
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Back"
            />
            <p>Back</p>
          </div>
          <div className="flex flex-col gap-2 w-36 py-3 px-5 text-gray-500 rounded">
            {["/", "/collection", "/about", "/contact"].map((route, index) => (
              <NavItem key={index} to={route}>
                {route === "/"
                  ? "Home"
                  : route.substring(1).charAt(0).toUpperCase() + route.slice(2)}
              </NavItem>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
