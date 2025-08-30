import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { authDataContext } from "../context/AuthContext.jsx";
import { adminDataContext } from "../context/AdminContext.jsx";
import axios from "axios";

const AdminNavbar = () => {
    const { adminData, setAdminData } = useContext(adminDataContext);
    const { serverURL } = useContext(authDataContext);
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    const handleLogout = async () => {
        try {
            const response = await axios.get(serverURL + "/api/auth/logout", { withCredentials: true });
            console.log(response.data);
            if (setAdminData) setAdminData(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
        setIsProfileOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 h-18">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 md:py-4 lg:px-8">
                <Link to="/admin/dashboard" className="text-2xl font-extrabold text-black sm:text-3xl">
                    AdminPanel
                </Link>

                <div className="hidden md:flex space-x-6 font-medium text-gray-800">
                    <Link to="/admin/add-items" className="hover:text-black">Add Items</Link>
                    <Link to="/admin/list-items" className="hover:text-black">List Items</Link>
                    <Link to="/admin/view-orders" className="hover:text-black">View Orders</Link>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="relative">
                        <div
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300"
                            onClick={toggleProfile}
                        >
                            <span className="font-semibold text-gray-800">
                                    A
                            </span>
                        </div>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                                {adminData ? (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-700">
                                            <p className="font-semibold">{adminData.name}</p>
                                            <p className="text-xs text-gray-500">{adminData.email}</p>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => {
                                                toggleProfile();
                                                handleLogout();
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleLoginRedirect}
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        className="md:hidden text-gray-700 hover:text-black focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="flex flex-col space-y-4 px-4 py-4">
                        <Link to="/admin/add-items" className="text-gray-800 font-medium hover:text-black" onClick={toggleMobileMenu}>Add Items</Link>
                        <Link to="/admin/list-items" className="text-gray-800 font-medium hover:text-black" onClick={toggleMobileMenu}>List Items</Link>
                        <Link to="/admin/view-orders" className="text-gray-800 font-medium hover:text-black" onClick={toggleMobileMenu}>View Orders</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;
