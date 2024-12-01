import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0 && cartItems && typeof cartItems === "object") {
      const tempData = Object.entries(cartItems)
        .filter(([, quantity]) => quantity > 0)
        .map(([id, quantity]) => {
          const productData = products.find(
            (product) => product.id === Number(id)
          );
          return { id, quantity, productData };
        });

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      <div>
        {cartData.map((item) => {
          if (!item.productData) {
            console.warn(`Product with ID ${item.id} not found`);
            return null;
          }

          const { productData } = item;
          const productImage =
            Array.isArray(productData.images) && productData.images.length > 0
              ? productData.images[0]
              : assets.placeholder_image; // Fallback image if none is available

          return (
            <div
              key={item.id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img
                  className="w-10 sm:w-20"
                  src={productImage}
                  alt={`Image of ${productData.title}`}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.title}
                  </p>
                  <p className="mt-2">
                    {currency}
                    {productData.price}
                  </p>
                </div>
              </div>
              <input
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (newQuantity > 0) {
                    updateQuantity(item.id, newQuantity);
                  }
                }}
                className="border max-w-10 sm:max-w-20 px-3 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item.id, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white hover:bg-slate-700 text-sm my-8 px-8 py-3">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
