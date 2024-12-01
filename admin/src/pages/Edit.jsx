import React, { useState, useEffect } from "react";
import { backendUrl } from "../App"; // Ensure this path is correct
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  { id: 1, name: "computer and peripherals" },
  { id: 2, name: "mobile and accessories" },
  { id: 3, name: "gaming and console" },
  { id: 4, name: "home electronic" },
  { id: 5, name: "photography and video" },
];

const Edit = ({ token }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(categories[0].name);

  useEffect(() => {
    if (!productId) {
      console.error("No product ID found in URL.");
      toast.error("Product ID is missing.");
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${backendUrl}product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const product = response.data;
        if (product) {
          setName(product.title);
          setDescription(product.description);
          setPrice(Number(product.price));
          setStock(Number(product.stock));
          setCategory(product.category?.title || categories[0].name);
          setImages(product.images || []);
        } else {
          toast.error("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Error fetching product data.");
      }
    };

    fetchProductData();
  }, [productId, token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name.trim()) 
      {
      return toast.error("Product name must be a non-empty string.");
    }
    if (!description.trim()) {
      return toast.error("Description must be a non-empty string.");
    }
    if (!price || isNaN(price) || price <= 0) {
      return toast.error("Price must be a positive number.");
    }
    if (!stock || isNaN(stock) || stock < 0) {
      return toast.error("Stock cannot be less than 0.");
    }

    try {
      const categoryId = categories.find(
        (categoryItem) => categoryItem.name === category
      )?.id;

      if (!categoryId) {
        return toast.error("Invalid category selected.");
      }

      const formData = new FormData();
      formData.append("id", productId); // Add the product ID to the form data
      formData.append("title", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("stock", Number(stock));
      formData.append("categoryId", categoryId);

      images.forEach((img) => {
        if (typeof img === "object") {
          formData.append("images", img);
        }
      });

      const response = await axios.patch(
        `${backendUrl}product/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      navigate("/list");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload images</p>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                alt={`Upload ${index + 1}`}
              />
              <input
                onChange={(e) => {
                  const imgFile = e.target.files[0];
                  if (imgFile) {
                    const updatedImages = [...images];
                    updatedImages[index] = imgFile;
                    setImages(updatedImages);
                  }
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[300px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[300px] px-3 py-2 border border-gray-300 rounded"
          placeholder="Type here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border border-gray-300 rounded">
            {categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.name}>
                {categoryItem.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border border-gray-300 rounded sm:w-[120px]"
            type="number"
            placeholder="0"
            required
          />
        </div>

        <div>
          <p className="mb-2">Stock</p>
          <input
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            className="w-full px-3 py-2 border border-gray-300 rounded sm:w-[120px]"
            type="number"
            placeholder="0"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-emerald-700 text-white hover:bg-emerald-950 rounded">
        Edit Product
      </button>
    </form>
  );
};

export default Edit;
