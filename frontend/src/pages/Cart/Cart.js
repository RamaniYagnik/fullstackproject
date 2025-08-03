import React, { useContext, useEffect, useState } from 'react';
import Api from '../../APIs/BackendApi';
import { toast } from 'react-toastify';
import displayINRcurrency from '../../helpers/DisplayCurrency';
import { IoIosTrash } from "react-icons/io";
import Context from '../../context/context';
import { useNavigate } from 'react-router-dom';
import DeliveryForm from '../../component/deliveryform/Deliveryform';
import Modal from '../../component/Model/Model';

const Cart = ({ onClose }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState({
        fullName: "",
        mobile: "",
        pincode: "",
        city: "",
        state: "",
        houseAddress: "",
        landmark: ""
    });

    const context = useContext(Context);
    const navigate = useNavigate();

    const isDeliveryFormValid = () => {
        const { fullName, mobile, pincode, city, state, houseAddress } = deliveryDetails;
        return fullName && mobile && pincode && city && state && houseAddress;
    };

    const fetchData = async () => {
        try {
            const response = await fetch(Api.getProductInCart.url, {
                method: Api.getProductInCart.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setData(dataResponse.data?.items || []);
            } else {
                toast.error(dataResponse.message || "Failed to load cart");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const handleLoading = async () => {
        setLoading(true);
        await fetchData();
        setLoading(false);
    };

    useEffect(() => {
        handleLoading();
    }, []);

    const increaseQyt = async (id, qty) => {
        const response = await fetch(`${Api.updateProduct.url}/${id}`, {
            method: Api.updateProduct.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantity: qty + 1 }),
        });
        const responseData = await response.json();
        if (responseData) fetchData();
    };

    const decreaseQyt = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(`${Api.updateProduct.url}/${id}`, {
                method: Api.updateProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ quantity: qty - 1 }),
            });
            const responseData = await response.json();
            if (responseData) fetchData();
        }
    };

    const deleteProduct = async (id) => {
        const response = await fetch(`${Api.deleteProduct.url}/${id}`, {
            method: Api.deleteProduct.method,
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchAddTocart();
        }
    };

    const orderValue = data.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
    const discount = 1500;
    const grandTotal = orderValue - discount;

    return (
        <div className="lg:mx-20 lg:mb-10 lg:mt-44">
            <div className="p-6 bg-gray-100 rounded-lg">
                {loading ? (
                    <div className="text-center text-lg">Loading...</div>
                ) : data.length === 0 ? (
                    <div className="h-full flex justify-center items-center">
                        <p className="text-3xl bg-white italic text-center p-4 rounded shadow">Your Cart Is Empty</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        <div className="w-full lg:w-3/5 space-y-6">
                            {data.map((item, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md p-4">
                                    <img
                                        src={item.product?.productImage[0] || 'https://via.placeholder.com/150'}
                                        alt={item.product?.productName}
                                        className="md:w-28 md:h-28 object-contain rounded"
                                    />
                                    <div className="pl-4 flex flex-col justify-between flex-1">
                                        <p className="text-gray-600 text-sm">{item.product?.brandName}</p>
                                        <h3 className="text-lg font-semibold md:line-clamp-3 line-clamp-1">
                                            {item.product?.productName?.split(' ').slice(0, 5).join(' ') +
                                                (item.product?.productName?.split(' ').length > 5 ? '...' : '')}
                                        </h3>
                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => decreaseQyt(item._id, item.quantity)}
                                                className="px-2 py-1 border rounded hover:bg-yellow-600 hover:text-white transition-all"
                                            >
                                                -
                                            </button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQyt(item._id, item.quantity)}
                                                className="px-2 py-1 border rounded hover:bg-yellow-600 hover:text-white transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sm:ml-auto flex flex-col justify-between items-end text-right sm:h-full sm:justify-between sm:py-2">
                                        <button
                                            className="group p-2 hover:text-white hover:bg-yellow-600 text-xl hover:border-yellow-600 border border-slate-400 transition-all rounded-lg"
                                            onClick={() => deleteProduct(item._id)}
                                        >
                                            <IoIosTrash className="transition-all duration-800 group-hover:scale-150" />
                                        </button>
                                        <p className="text-sm font-semibold">{displayINRcurrency(item.product?.price)}</p>
                                        {item.quantity > 1 && (
                                            <p className="text-sm font-semibold">{displayINRcurrency(item.product?.price * item.quantity)}</p>
                                        )}
                                        <p className="text-green-500 text-sm">7 Days Return</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="md:sticky md:top-44 bg-white p-6 rounded-xl shadow-2xl">
                                <h3 className="text-lg font-semibold mb-4">Order Summary ({data.length} item{data.length > 1 && 's'})</h3>

                                {/* Displaying Delivery Details
                                
                                    <div className="space-y-2 mb-4">
                                        <p><strong>Delivery Details:</strong></p>
                                        <p>{deliveryDetails.fullName}</p>
                                        <p>{deliveryDetails.mobile}</p>
                                        <p>{deliveryDetails.houseAddress}, {deliveryDetails.city}, {deliveryDetails.state}, {deliveryDetails.pincode}</p>
                                    </div> */}


                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Order Value</span>
                                        <span>₹{orderValue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Coupon Discount</span>
                                        <span className="text-green-600">{displayINRcurrency(discount)}</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-300 my-4"></div>
                                <div className="flex justify-between font-bold text-xl">
                                    <span>Grand Total</span>
                                    <span>₹{grandTotal.toLocaleString()}</span>
                                </div>

                                <button
                                    className="w-full bg-yellow-600 text-white font-semibold py-2 mt-4 rounded hover:bg-yellow-700"
                                    onClick={() => setShowDeliveryForm(true)}
                                >
                                    PROCEED TO CHECKOUT
                                </button>

                                <div className="mt-3 text-sm text-green-600">You’re saving ₹{discount} on this purchase</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Modal show={showDeliveryForm} closeModal={() => setShowDeliveryForm(false)}>
                <DeliveryForm
                    deliveryDetails={deliveryDetails}
                    setDeliveryDetails={setDeliveryDetails}
                    isDeliveryFormValid={isDeliveryFormValid}
                    grandTotal={grandTotal}
                    refreshCart={fetchData}
                    onClose={() => setShowDeliveryForm(false)}
                />
            </Modal>
        </div>
    );
};

export default Cart;