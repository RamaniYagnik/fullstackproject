import React, { useContext, useEffect, useState } from 'react';
import Api from '../../APIs/BackendApi';
import { toast } from 'react-toastify';
import displayINRcurrency from '../../helpers/DisplayCurrency';
import Context from '../../context/context';
import Addtocart from '../../helpers/Addtocart';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const context = useContext(Context);

    const { fetchAddTocart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await Addtocart(e, id)
        fetchAddTocart()
    }

    const fetchWishlist = async () => {
        try {
            const res = await fetch(Api.getWishlist.url, {
                method: Api.getWishlist.method,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setWishlist(data.data);
            } else {
                toast.error(data.message || "Failed to fetch wishlist");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const removeFromWishlist = async (id) => {
        try {
            const res = await fetch(Api.deleteWishlist.url(id), {
                method: Api.deleteWishlist.method,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                fetchWishlist();
                context.fetchWishlist();
                toast.success("Removed from wishlist");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (wishlist.length === 0) {
        return <p className="text-center text-xl py-20">Your Wishlist is empty</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">WISHLIST</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map((product, idx) => (
                    <div key={idx} className="bg-white rounded-md shadow-md border p-4">
                        <div className="relative">
                            <img
                                src={product.productImage[0]}
                                alt={product.productName}
                                className="w-full h-56 object-cover rounded"
                            />
                            {
                                product?.price > product?.sellingPrice && (
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                        SALE
                                    </span>
                                )
                            }
                        </div>
                        <div className="mt-4 space-y-1">
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
                            {product.price > product.sellingPrice ? (
                                <>
                                    <div className="text-lg font-bold text-gray-900">
                                        {displayINRcurrency(product.sellingPrice)}{' '}
                                        <span className="line-through text-gray-400 text-sm font-medium ml-2">
                                            {displayINRcurrency(product.price)}
                                        </span>{' '}
                                        <span className="text-green-600 text-sm font-medium ml-1">
                                            {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% off
                                        </span>
                                    </div>
                                    <div className="text-xs text-blue-600 font-medium">
                                        Price Dropped by ₹ {product.price - product.sellingPrice}
                                    </div>
                                </>
                            ) : (
                                <div className="text-lg font-bold text-gray-900">
                                    {displayINRcurrency(product.price)}
                                </div>
                            )}
                            <div className="mt-3 flex justify-between">
                                <button className="border border-gray-700 text-gray-700 px-4 py-1.5 rounded hover:bg-gray-800 hover:text-white transition" onClick={(e) => handleAddToCart(e, product._id)}>
                                    ADD TO CART
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(product._id)}
                                    className="border border-gray-700 text-gray-700 px-4 py-1.5 rounded hover:bg-gray-800 hover:text-white transition"
                                >
                                    REMOVE
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;