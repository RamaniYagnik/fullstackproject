import React, { useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../../helpers/fetchCategoryWiseProduct'
import displayINRcurrency from '../../helpers/DisplayCurrency'
import { Link, useNavigate } from 'react-router-dom'
import Addtocart from '../../helpers/Addtocart'
import { useContext } from 'react'
import Context from '../../context/context'
import Api from '../../APIs/BackendApi'
import { toast } from 'react-toastify'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const HorizontalCardProduct = ({
    category,
    heading
}) => {

    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const [wishlistMap, setWishlistMap] = useState({});

    const navigate = useNavigate()

    const { fetchAddTocart, fetchWishlist } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await Addtocart(e, id)
        fetchAddTocart()
        navigate("/cart")
    }

    const fetchData = async () => {
        setloading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setData(categoryProduct?.data || [])
        setloading(false)
    }

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
            setWishlistMap(prev => ({ ...prev, [productId]: true }));
            fetchWishlist();
        } else {
            toast.error(data.message);
        }
    };

    useEffect(() => {
        fetchData()
    }, [category])

    return (
        <div className='px-4 my-6 mx-16'>
            <h2 className='text-2xl font-semibold'>{heading}</h2>

            <div className="flex my-4 overflow-scroll scrollbarnone">
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="w-full mx-3 my-5 flex justify-center bg-slate-100 rounded-lg items-center p-4 animate-pulse">
                            <div className="w-full">
                                <div className="bg-gray-300 h-40 w-[200px] rounded mb-4"></div>
                                <div className="h-4 bg-gray-300 w-full rounded mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                                <div className="h-8 bg-gray-300 rounded w-full mt-3"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product, index) => (
                        <Link to={"/productdetails/" + product?._id} key={index} className="mx-3 my-5 flex justify-center bg-slate-100 rounded-lg items-center p-4 hover:shadow-lg shadow-black transition-all">
                            <div className="overflow-hidden flex justify-center items-center w-[250px]">
                                <div>
                                    <div className='relative'>
                                        <img
                                            src={product?.productImage[0]}
                                            alt=""
                                            className="object-contain w-full h-full mix-blend-multiply hover:scale-105 transition-all"
                                        />
                                        {
                                            product?.price > product?.sellingPrice && (
                                                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                                    SALE
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center text-sm">
                                            <span className="bg-yellow-400 text-white px-1.5 py-0.5 rounded text-xs font-medium mr-2">
                                                4.3 ★
                                            </span>
                                            <span className="text-gray-600">(533)</span>
                                        </div>
                                        <div className="text-sm text-gray-800 font-semibold">
                                            {product.brandName} | {product.categoryName}
                                        </div>
                                        <div className="text-sm text-gray-600 line-clamp-1">{product.productName}</div>
                                        <div className=' gap-2'>
                                            {product.price > product.sellingPrice ? (
                                                <>
                                                    <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                        {displayINRcurrency(product.sellingPrice)}
                                                        <div className='ml-auto flex items-center gap-2'>
                                                            <span className="line-through text-gray-400 text-sm font-medium">
                                                                {displayINRcurrency(product.price)}
                                                            </span>
                                                            <span className=" text-green-600 text-sm font-medium">
                                                                {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% off
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-blue-600 font-medium mt-1">
                                                        Price Dropped by ₹ {product.price - product.sellingPrice}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-lg font-bold text-gray-900">
                                                    {displayINRcurrency(product.price)}
                                                </div>
                                            )}
                                        </div>

                                        <div className='flex justify-between items-center relative'>
                                            <button className='bg-white py-1 px-6 rounded-xl border border-slate-400 w-3/4 my-3 hover:border-yellow-700 hover:text-yellow-700 transition-all group'>
                                                <span className='inline-block text-xs transition-transform group-hover:scale-125' onClick={(e) => handleAddToCart(e, product?._id)}>Add To Cart</span>
                                            </button>
                                            <button

                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    addToWishlist(product._id);
                                                }}

                                                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100 transition-all w-1/11"
                                                title="Add to Wishlist"
                                            >
                                                {wishlistMap[product._id] ? (
                                                    <AiFillHeart size={24} className="text-red-500" />
                                                ) : (
                                                    <AiOutlineHeart size={24} className="text-gray-500 hover:text-red-500" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default HorizontalCardProduct
