import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaRegEye, FaRegEyeSlash, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { adminDataContext } from "../context/AdminContext.jsx";
import { authDataContext } from "../context/AuthContext.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { serverURL } = useContext(authDataContext);
    const { adminData, getAdmin } = useContext(adminDataContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (adminData && adminData._id) {
            navigate("/");
        }
    }, [adminData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = formData;
        try {
            const result = await axios.post(
                serverURL + "/api/auth/adminlogin",
                { email, password },
                { withCredentials: true }
            );
            console.log(result.data);
            toast.success("Admin login successful");
            getAdmin();
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Admin login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Continue with your admin account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                            className="w-full pl-10 pr-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
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
                        {loading ? <ClipLoader size={24} color="white" /> : "Log In"}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
