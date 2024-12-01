import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-100 w-500">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="footer" />
          <p className="w-full md:w-2/3 text-gray-600 text-xl">
            Your trusted destination for the latest in electronics. From
            cutting-edge gadgets to everyday essentials, we’re committed to
            quality, innovation, and customer satisfaction.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer hover:text-black hover:text-base hover:ease-in-out text-xl">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:text-base hover:ease-in-out text-xl">
              <Link to="/about">About Us</Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:text-base hover:ease-in-out text-xl">
              <Link to="/delivery">Delivery</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600 text-lg">
            <li>
              <a href="mailto:surafelgbr@gmail.com" className="hover:underline">
                surafelgbr@gmail.com
              </a>
            </li>
            <li>
              <a
                href="mailto:abelfentaw2000@gmail.com"
                className="hover:underline">
                abelfentaw2000@gmail.com
              </a>
            </li>
            <li>
              <a href="mailto:amiryemimi@gmail.com" className="hover:underline">
                amiryemimi@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ Gizmosphere - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
