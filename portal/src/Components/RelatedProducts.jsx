import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Filter products based on the category title and exclude the current product
      const filteredProducts = products
        .filter((item) => item.category.title === category)
        .filter((item) => item.id !== currentProductId);

      // Limit to the first 5 related products
      setRelated(filteredProducts.slice(0, 5));
    }
  }, [products, category, currentProductId]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {related.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.title}
            price={item.price}
            image={item.images[0]} // Use the first image URL directly
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
