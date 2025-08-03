import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import Api from "../../APIs/BackendApi";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const navigate = useNavigate()

    const [showpassword, setShowPassword] = useState(false)
    const [cshowpassword, setcShowPassword] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

            e.preventDefault();
        if (formData.password === formData.cpassword) {

            const dataresponse = await fetch(Api.signup.url, {
                method: Api.signup.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await dataresponse.json()

            if (data.success) {
                toast.success(data.message)
                navigate("/login")
            } 

            if (data.error) {
                toast.error(data.message)
            }

            console.log("Signup data:", data);

        } else {
            console.log("Please Check Password...");
        }


    };

    return (
        <div className="min-h-screen lg:mt-28 md:mt-20 mt-28 flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Enter Your Name</label>
                        <div className="flex bg-slate-100 rounded-xl">
                            <input
                                type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent px-4 py-2 mt-1 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <div className="flex bg-slate-100 rounded-xl">
                            <input
                                type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent px-4 py-2 mt-1 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cpassword" className="block text-sm font-medium text-gray-600">Password</label>
                        <div className="flex bg-slate-100 rounded-xl">
                            <input
                                type={showpassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full bg-transparent px-4 py-2 mt-1 rounded-lg focus:outline-none"
                            />
                            <div className="cursor-pointer text-xl flex items-center px-3" onClick={() => setShowPassword((prev) => !prev)}>
                                <span className="">
                                    {
                                        showpassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <IoIosEye />
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cpassword" className="block text-sm font-medium text-gray-600">Confirm-Password</label>
                        <div className="flex bg-slate-100 rounded-xl">
                            <input
                                type={cshowpassword ? 'text' : 'password'} id="cpassword" name="cpassword" value={formData.cpassword} onChange={handleChange} required className="w-full bg-transparent px-4 py-2 mt-1 rounded-lg focus:outline-none"
                            />
                            <div className="cursor-pointer text-xl flex items-center px-3" onClick={() => setcShowPassword((prev) => !prev)}>
                                <span className="">
                                    {
                                        cshowpassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <IoIosEye />
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="block mx-auto bg-yellow-600 text-white py-2 px-6 rounded-full hover:bg-yellow-700 transition-all"
                    >
                        Sign Up
                    </button>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account? <a href="/login" className="text-yellow-600 hover:underline">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
