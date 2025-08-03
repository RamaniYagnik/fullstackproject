import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import Api from "../../APIs/BackendApi";
import { useNavigate } from "react-router-dom";
import Context from "../../context/context";
import loadRazorpayScript from "../../helpers/RazorpayScript";

function DeliveryForm({ grandTotal, onClose }) {
    const navigate = useNavigate();
    const context = useContext(Context);

    const [deliveryDetails, setDeliveryInfo] = useState({
        fullName: "",
        mobile: "",
        houseAddress: "",
        city: "",
        state: "",
        pincode: "", 
        landmark: ""
    });

    const [errors, setErrors] = useState({});

    const validateDeliveryInfo = () => {
        const newErrors = {};
        if (!deliveryDetails.fullName) newErrors.name = "Name is required";
        if (!deliveryDetails.mobile) newErrors.mobile = "Phone is required";
        if (!deliveryDetails.houseAddress) newErrors.address = "Address is required";
        if (!deliveryDetails.city) newErrors.city = "City is required";
        if (!deliveryDetails.state) newErrors.state = "State is required";
        if (!deliveryDetails.pincode) newErrors.pincode = "Pincode is required";
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo({ ...deliveryDetails, [name]: value });
    };

    const handlePayment = async () => {
        const validationErrors = validateDeliveryInfo();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (grandTotal < 1) {
            toast.error("Total amount must be at least 1 INR.");
            return;
        }

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            const response = await fetch(Api.createOrder.url, {
                method: Api.createOrder.method,
                credentials: "include",
                body: JSON.stringify({
                    amount: grandTotal, // Ensure amount is in paise
                    deliveryDetails,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error("Failed to create Razorpay order: " + data.message);
            }

            const options = {
                key: "rzp_test_ovPLb7nFwiBEGM",
                amount: data.order.amount,
                currency: "INR",
                name: "Your Store",
                description: "Order Payment",
                order_id: data.order.id,
                handler: async function (response) {
                    try {
                        const res = await fetch(Api.verifyPayment.url, {
                            method: "POST",
                            credentials: "include", // send cookies/session
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                deliveryDetails,
                            }),
                        });

                        const resData = await res.json();

                        if (res.ok && resData.success) {
                            toast.success("Order placed successfully");
                            context.fetchAddTocart();
                            navigate("/order-success");
                        } else {
                            toast.error(resData.message || "Failed to place order");
                        }
                    } catch (err) {
                        console.error("Payment verification error:", err);
                        toast.error("Payment verification failed.");
                    }
                },
                prefill: {
                    name: deliveryDetails.fullName,
                    contact: deliveryDetails.mobile,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Error initiating payment:", err);  // Log the error in console for debugging
            toast.error("Payment initiation failed.");
        }
    };

    return (
        <div className="delivery-form-modal">
            <h2 className="text-xl font-semibold text-center mb-6">Enter Delivery Info</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="border p-3 mt-2 rounded"
                            placeholder="Enter Your Name"
                            value={deliveryDetails.fullName}
                            onChange={handleInputChange}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number *</label>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-700 pr-2">+91</span>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                className="border p-3 mt-2 w-full rounded"
                                placeholder="Enter Your Mobile Number"
                                value={deliveryDetails.mobile}
                                onChange={handleInputChange}
                            />
                        </div>
                        {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="houseAddress" className="text-sm font-medium text-gray-700">Address (Building Name, Street, Area) *</label>
                        <input
                            type="text"
                            id="houseAddress"
                            name="houseAddress"
                            className="border p-3 mt-2 rounded"
                            placeholder="Enter Your Address"
                            value={deliveryDetails.houseAddress}
                            onChange={handleInputChange}
                        />
                        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="landmark" className="text-sm font-medium text-gray-700">Landmark</label>
                        <input
                            type="text"
                            id="landmark"
                            name="landmark"
                            className="border p-3 mt-2 rounded"
                            placeholder="Enter Landmark"
                            value={deliveryDetails.landmark}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode *</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            className="border p-3 mt-2 rounded"
                            placeholder="Enter Pincode"
                            value={deliveryDetails.pincode}
                            onChange={handleInputChange}
                        />
                        {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="city" className="text-sm font-medium text-gray-700">City *</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="border p-3 mt-2 rounded"
                            placeholder="Enter City"
                            value={deliveryDetails.city}
                            onChange={handleInputChange}
                        />
                        {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="state" className="text-sm font-medium text-gray-700">State *</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            className="border p-3 mt-2 rounded"
                            placeholder="Enter State"
                            value={deliveryDetails.state}
                            onChange={handleInputChange}
                        />
                        {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="country" className="text-sm font-medium text-gray-700">Country *</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            className="border p-3 mt-2 rounded"
                            placeholder="India"
                            value="India"
                            readOnly
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        className="px-6 py-2 border-2 rounded-lg text-black border-gray-400 hover:text-yellow-600 hover:border-yellow-600 font-semibold transition-all"
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg"
                        onClick={handlePayment}
                    >
                        CONTINUE
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeliveryForm;
