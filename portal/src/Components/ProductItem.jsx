import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, images, title, price }) => {
  const { currency } = useContext(ShopContext);

  // Fallback to the first image or a default image if none are provided
  const displayImage = images && images.length > 0 ? images[0] : "/path/to/default/image.png";

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={displayImage}
          alt={title || "Product Image"} // Set default alt text for accessibility
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{title}</p>
      <p className="text-sm font-medium">
        {currency}
        {parseFloat(price).toFixed(2)} {/* Ensure price displays with two decimal places */}
      </p>
    </Link>
  );
};

export default ProductItem;
