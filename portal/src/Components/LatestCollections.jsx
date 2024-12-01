import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products) {
      // Reverse the products array and then slice the first 10 items
      setLatestProducts(products.slice().reverse().slice(0, 10)); // Use slice() to avoid mutating original array
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          These are the latest collections on our site.
        </p>
      </div>
      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            images={item.images} // Pass the images array
            title={item.title} // Pass the title as name
            price={item.price} // Pass the price
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
