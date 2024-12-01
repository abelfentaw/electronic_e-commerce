/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "ETB";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    getProductsData();
    if (token) getUserCart(token);
  }, [token]);

  // Fetch products data
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}product/list`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
     
    }
  };

  // Fetch user's cart data
  const getUserCart = async (token) => {
    try {
      const response = await axios.get(`${backendUrl}cart/all-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(
        response.data.cartItems.reduce((acc, item) => {
          acc[item.product.id] = item.quantity;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching cart:", error);
      
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    const updatedCart = { ...cartItems, [productId]: (cartItems[productId] || 0) + quantity };
    setCartItems(updatedCart);
    toast.success("Item added to cart!");

    if (token) {
      try {
        await axios.post(
          `${backendUrl}cart/add`,
          { productId, quantity: updatedCart[productId] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
        
      }
    }
  };

  // Update cart item quantity
  const updateQuantity = async (productId, quantity) => {
    const updatedCart = { ...cartItems, [productId]: quantity };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}cart/update`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update cart. Please try again.");
      }
    }
  };

  // Get the total count of items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);
  };

  // Get the total amount of the cart
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === Number(productId));
      return product ? total + product.price * quantity : total;
    }, 0);
  };

  // Context value to be provided to children components
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
