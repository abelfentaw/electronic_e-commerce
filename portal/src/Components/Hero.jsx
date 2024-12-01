import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets"; // Adjust the path as necessary

const HeroSlider = () => {
  const slides = [
    {
      title: "Latest Arrivals",
      subtitle: "Our Bestseller",
      image: assets.hero1, // Replace with your actual image paths
    },
    {
      title: "Spring Collection",
      subtitle: "New Styles Available",
      image: assets.lap1,
    },
    {
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      image: assets.pss,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  // Auto-swipe every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden mt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}>
          <img
            className="w-full h-full object-cover"
            src={slide.image}
            alt={slide.title}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
            <div className="text-white text-center">
              <div className="flex items-center gap-2 justify-center">
                <p className="w-8 h-[1px] bg-white"></p>
                <p className="font-medium text-sm md:text-base">
                  {slide.subtitle}
                </p>
              </div>
              <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
                {slide.title}
              </h1>
              <div className="flex items-center gap-2 justify-center">
                <p className="font-medium text-sm md:text-base">Shop Now</p>
                <p className="w-8 h-[1px] bg-white"></p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow hover:bg-opacity-75 transition">
        {/* Left Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow hover:bg-opacity-75 transition">
        {/* Right Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
