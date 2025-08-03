import React, { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../APIs/BackendApi.js";
import { toast } from "react-toastify";
import Context from "../../context/context.js";

const LoginForm = () => {

    const [ loginData, setLoginData ] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetail, fetchAddTocart } = useContext(Context)

    const [showpassword, setShowPassword] = useState(false)

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loginData.email !== "" || loginData.password !== "") {
            
            const dataresponse =    await fetch(Api.login.url,{
                method: Api.login.method,
                credentials: "include",
                headers: {
                    "content-type":"application/json"
                },
                body: JSON.stringify(loginData)
            })

            const data = await dataresponse.json()

            if (data.success) {
                toast.success(data.message)
                navigate("/")
                fetchUserDetail()
                fetchAddTocart()
            }
            if (data.error) {
                toast.error(data.message)
            }

        } else {
            console.log("please enter email or password");
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to your account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <div className="flex bg-slate-100 rounded-xl">
                            <input
                                type="email" id="email" name="email" value={loginData.email} onChange={handleChange} required className="w-full bg-transparent px-4 py-2 mt-1 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <div className="flex bg-slate-100 rounded-xl">
                            <input
                                type={showpassword ? 'text' : 'password'} id="password" name="password" value={loginData.password} onChange={handleChange} required className="w-full bg-transparent px-4 py-2 mt-1 rounded-lg focus:outline-none"
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
                        <Link to={'/forgotpassword'} className="text-blue-700 underline underline-offset-2 text-xs" >Forgot-Password</Link>
                    </div>
                    <button
                        type="submit"
                        className="block mx-auto bg-yellow-600 text-white py-2 px-6 rounded-full hover:bg-yellow-700 transition-all"
                    >
                        Login
                    </button>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Don't have an account? <a href="/signup" className="text-yellow-600 hover:underline">Signup</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
