import React from "react";

const Rating = ({ productId, currentRating, onRatingChange }) => {
  const handleRating = (rating) => {
    onRatingChange(productId, rating);
  };
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <span
            key={index}
            onClick={() => handleRating(starRating)}
            className={`cursor-pointer ${
              starRating <= currentRating ? "text-yellow-500" : "text-gray-400"
            }`}>
            ★
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
