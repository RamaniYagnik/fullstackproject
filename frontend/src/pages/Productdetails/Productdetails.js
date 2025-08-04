import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import displayINRcurrency from '../../helpers/DisplayCurrency';
import { LiaAmazonPay } from "react-icons/lia";
import { Truck, RefreshCcw, ShieldCheck, ShoppingCart } from 'lucide-react';
import Context from '../../context/context';
import Addtocart from '../../helpers/Addtocart';
import HorizontalCardProduct from '../../component/HorizontalCardProduct/horizontalCardProduct';
import Accordion from '../../component/accordion/Accordion';
import { FaStar } from "react-icons/fa";
import Api from '../../APIs/BackendApi';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const { fetchAddTocart,fetchWishlist } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await Addtocart(e, id);
    fetchAddTocart();
    navigate("/cart");
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/products/productdetails/${id}`)
      .then(response => {
        setProduct(response.data);
        setMainImage(response.data.productImage[0]);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-semibold animate-pulse text-blue-600">Loading product details...</p>
      </div>
    );
  }

  const specifications = [
    { label: 'Display Brand', value: product.brandName },
    { label: 'Name', value: product.productName },
    { label: 'Glass Material', value: 'Mineral Glass' },
    { label: 'Warranty Period', value: '24 Months' },
    { label: 'Warranty Detail', value: 'This watch offers 24 months warranty on the Movement and 12 months warranty on the Battery from the date of purchase' },
    { label: 'Water Resistance', value: '50M Water Resistence' },
    { label: 'Function', value: 'Multifunction' },
    { label: 'Lock Mechanism', value: 'Divers with Push Type Clasp' },
    { label: 'Movement', value: 'Quartz' },
    { label: 'Case Length', value: '49Mm' },
  ].filter(item => item.value);

  const addToWishlist = async (productId) => {
    const response = await fetch(Api.addToWishlist.url, {
      method: Api.addToWishlist.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Added to wishlist");
      setIsWishlisted(true);
      fetchWishlist();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 p-6 max-w-screen-xl mx-auto">
        <div className="flex gap-6 w-full lg:w-1/2 justify-center">
          <div className="flex md:flex-col gap-2 overflow-y-auto scrollbarnone max-h-96 pr-1 mt-4">
            {product.productImage.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setMainImage(img)}
                className="w-16 h-16 object-cover cursor-pointer border border-gray-300 hover:border-black transition-all"
              />
            ))}
          </div>

          <div className="relative border p-2 max-h-[500px]">
            <img
              src={mainImage}
              alt={product.productName}
              className="w-[400px] object-contain"
            />

            {/* Wishlist Icon */}
            <button
              onClick={() => addToWishlist(product._id)}
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100 transition-all"
              title="Add to Wishlist"
            >
              {isWishlisted ? (
                <AiFillHeart size={24} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={24} className="text-gray-500 hover:text-red-500" />
              )}
            </button>
          </div>

        </div>

        {/* Product Details */}

        <div className="lg:w-1/2 flex flex-col justify-center px-4">
          <div className='flex'>
            <span className='flex items-center gap-2'>
              <p className="text-gray-500 font-semibold py-4">{product.brandName}</p>
              <span className='mx-4'>|</span>
              <p class name="text-gray-500 font-semibold py-4">{product.category}</p>
            </span>
            <span className='flex items-center gap-2 ml-auto'>
              <p className="text-gray-500 font-semibold py-4">Rating:</p>
              <p className='flex gap-2'><span className='text-yellow-500 mt-1'><FaStar /></span> 4.1</p>
              <span className='mx-4'>|</span>
              <p className="text-gray-500 font-semibold py-4">Reviews: 54</p>
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>

          {/* Price and Discount */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold text-red-600">{displayINRcurrency(product.sellingPrice)}</p>
            {product.sellingPrice < product.price && (
              <>
                <p className="text-sm text-gray-500 line-through">{displayINRcurrency(product.price)}</p>
                <p className="text-sm text-green-600 font-semibold">
                  {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% off
                </p>
              </>
            )}
          </div>

          {/* Login/Signup for NeuCoins */}
          <Link to={'/login'} className="text-sm text-gray-500 mb-4">
            <span className='text-blue-500 hover:text-blue-700 transition-all'>Login/Signup</span> to use NeuCoins on this purchase
          </Link>

          {/* Product Description */}
          <p className="my-5 line-clamp-4">{product.description}</p>

          <div className="flex gap-4 mb-8">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">Buy Now</button>
            <button
              onClick={(e) => handleAddToCart(e, product?._id)}
              className="border border-black px-6 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        </div>

      </div>

      <div className='mt-5 mb-10'>
        <div className="flex justify-around gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={60} /> <span className='text-xl font-semibold italic'>24 Months Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={60} /> <span className='text-xl font-semibold italic'>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw size={60} /> <span className='text-xl font-semibold italic'>Easy Return</span>
          </div>
          <div className="flex items-center gap-2">
            <LiaAmazonPay size={60} />
            <span className='text-xl font-semibold italic'>Pay on Delivery</span>
          </div>
        </div>
      </div>

      {/* Product Specification Accordion */}
      <div className="max-w-screen-xl mx-auto px-6 mb-8">
        <Accordion specifications={specifications} />
      </div>

      <div className='w-full'>
        <h1 className='text-2xl font-bold text-center mb-4'>Related Products</h1>
        <HorizontalCardProduct category={product?.category} />
      </div>
    </div>
  );
};

export default ProductDetails;
