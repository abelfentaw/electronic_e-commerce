import React, { useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigaet, token, setCartItems, backendUrl } = useState(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams;

  const success = searchParams.get("success");
  const orderId = searchParams.get(orderId);

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backendUrl}order/verifyChapa`,
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigaet("/orders");
      } else {
        navigaet("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
