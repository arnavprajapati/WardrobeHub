import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaRegEye, FaRegEyeSlash, FaGoogle, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { authDataContext } from "../context/AuthContext.jsx";
import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase.js";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { serverURL } = useContext(authDataContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(serverURL + "/api/auth/signup", formData, {
                withCredentials: true,
            });
            console.log(result.data);
            navigate("/");
            toast.success("Sign Up Successful 🎉");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const googleSignUp = async () => {
        try{
            const response = await signInWithPopup(auth, provider)
            // console.log(response);
            let user = response.user;
            let name = user.displayName;
            let email = user.email;

            const result = await axios.post(serverURL + "/api/auth/google-login", {name, email}, {
                withCredentials: true,
            });
            console.log(result.data);
            navigate("/");
            toast.success("Sign Up Successful 🎉");
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Join us & start shopping today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            required
                            className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <div
                            className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex justify-center"
                    >
                        {loading ? <ClipLoader size={24} color="white" /> : "Sign Up"}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition" onClick={googleSignUp}>
                    <FaGoogle className="text-red-500" />
                    <span>Sign up with Google</span>
                </button>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?
                    <Link to="/login" className="text-black ml-1 font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
