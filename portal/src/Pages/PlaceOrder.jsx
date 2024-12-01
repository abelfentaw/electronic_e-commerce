import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    additionalDirection: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Check if cart is empty
      if (!cartItems || Object.keys(cartItems).filter(key => cartItems[key] > 0).length === 0) {
        toast.error("Your cart is empty");
        return;
      }
  
      // Prepare the order data to send to the backend without payment method
      const payload = {
        orderShipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,  // Email included in the order
          phone: formData.phone,
          state: formData.state,
          city: formData.city,
          additionalDirection: formData.additionalDirection,
        },
        orderProduct: Object.entries(cartItems)
          .filter(([, quantity]) => quantity > 0)
          .map(([productId, quantity]) => ({
            productId: parseInt(productId),
            product_quantity: quantity,
          })),
        // No payment method field is included here
      };
  
      // Send the data to the backend
      const response = await axios.post(
        `${backendUrl}order`,
        payload,
        { headers: { Authorization: `Bearer ${token}`} }
      );
      toast.success("Order placed successfully!");
  
      if (response.data.success) {
        // Clear cart in backend
        await axios.post(
          `${backendUrl}cart/checkout`,
          {},
          { headers: { Authorization: `Bearer ${token}`} }
        );
        toast.success("Order placed successfully!");
        setCartItems({}); // Clear cart items after successful order
        toast.success("Order placed successfully!");
        navigate("/orders"); // Navigate to orders page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      toast.error(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email} // email field included
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="E-mail"
        />
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone number"
        />
        <input
          required
          onChange={onChangeHandler}
          name="state"
          value={formData.state}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="State"
        />
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="additionalDirection"
            value={formData.additionalDirection}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Additional Direction"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-400 text-white px-16 py-3 text-sm"
          >
            Place order
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
