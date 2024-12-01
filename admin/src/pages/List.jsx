/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App"; // Ensure this path is correct
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Import Link for navigation

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}product/list`);
      setList(response.data || []); // Ensure products is an array
      console.log(response.data); // Log the fetched products
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products."); // More user-friendly error
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the product list after removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product."); // More user-friendly error
    }
  };

  useEffect(() => {
    fetchList(); // Fetch the product list on component mount
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product list */}
        {list.length === 0 ? (
          <p>No products found.</p>
        ) : (
          list.map((item) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={item.id}>
              {/* Use image URL directly */}
              <img
                className="w-12"
                src={
                  item.images && item.images.length > 0
                    ? item.images[0] // Accessing the first image in the array as a URL
                    : "default-image-url.jpg" // Fallback image URL if no valid image
                }
                alt={item.title || "Product Image"} // Improved alt text
              />
              <p>{item.title}</p>
              <p>
                {item.category ? item.category.title : "Unknown Category"}
              </p>{" "}
              {/* Handle null category */}
              <p>
                {currency}
                {item.price} {/* Display price directly without parsing */}
              </p>
              <div className="flex justify-end md:justify-center">
                {/* Edit Link */}
                <Link
                  to={`/edit/${item.id}`}
                  className="text-blue-500 hover:underline mr-4">
                  ✏️
                </Link>
                {/* Delete Action */}
                <p
                  onClick={() => removeProduct(item.id)}
                  className="cursor-pointer text-lg text-red-500">
                  x
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
