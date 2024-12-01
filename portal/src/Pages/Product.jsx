import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from '../Components/Rating'; // Assuming you have the Rating component for stars
import RelatedProducts from '../Components/RelatedProducts'; // Assuming you have a RelatedProducts component
import { ShopContext } from '../Context/ShopContext'; // Assuming ShopContext is imported from your context folder

const Product = () => {
  const { productId } = useParams(); // Extract the product id from the URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get the backend URL from the environment variables
  const { addToCart, cartItems, setCartItems } = useContext(ShopContext); // Access addToCart function and cart state from ShopContext
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}product/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token authentication if required
          },
        });

        setProduct(response.data);
        setRating(response.data.rating || 0); // Set the rating from the fetched data
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching product data');
        setLoading(false);
      }
    };

    fetchProduct(); // Fetch product data when the component mounts or `productId` changes
  }, [productId]);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // If no product found
  if (!product) {
    return <div>Product not found</div>;
  }

  // Destructure product data
  const { title, description, price, images, stock, category } = product;

  const handleAddToCart = async () => {
    try {
      if (!product.id || isNaN(product.id)) {
        // Make sure product.id is a valid number
        throw new Error('Invalid product ID');
      }

      const quantity = 1; // Default to 1 quantity

      if (isNaN(quantity) || quantity <= 0) {
        // Ensure quantity is a valid positive number
        throw new Error('Invalid quantity');
      }

      const productData = {
        productId: product.id, // Ensure productId is a number
        quantity: quantity, // Ensure quantity is a number
      };

      // Call addToCart from ShopContext to add the product to the cart
      addToCart(product.id); // Update cart with the selected product

      // Send the product data to the backend (if needed for persistence)
      

      console.log('Product added to cart successfully');
    } catch (err) {
      console.error('Error adding to cart:', err.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          totalCount += cartItems[item];
        }
      } catch (error) {
        error;
      }
    }
    return totalCount;
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {/* Product image thumbnails */}
            {images && images.length > 0 ? (
              images.map((imageUrl, index) => (
                <img
                  key={index}
                  onClick={() => setImage(imageUrl)}
                  src={imageUrl}
                  className="w-full sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt={`Image of ${title}`}
                />
              ))
            ) : (
              <p>No images available for this product.</p>
            )}
          </div>
          <div className="w-full sm:w-[80%]">
            {/* Main product image */}
            <img
              className="w-full h-auto"
              src={image || images[0]} // Default to first image if no thumbnail selected
              alt={`Main image of ${title}`}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{title}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* Rating component */}
            {[...Array(1)].map((_, index) => (
              <Rating key={index} currentRating={rating} onRatingChange={setRating} />
            ))}
            <p className="pl-2">({rating})</p> {/* Display rating value */}
          </div>
          <p className="mt-5 text-3xl font-medium">
            {/* Price with ETB currency */}
            {price} ETB
          </p>
          <p className="mt-2 text-gray-500">
            Stock: {stock} available
          </p>
          <p className="mt-5 text-gray-500 md:w4/5">{description}</p>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 mt-3 text-sm active:bg-gray-700"
          >
            Add to Cart
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original</p>
            <p>7 days money back guarantee</p>
          </div>
        </div>
      </div>

      {/* Related Products 
      <RelatedProducts category={category.title} currentProductId={product.id} />*/}
    </div>
  );
};

export default Product;
