import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { userDataContext } from "../context/UserContext.jsx";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Navbar = () => {
    const { userData, setUserData } = useContext(userDataContext); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { serverURL } = useContext(authDataContext);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get(serverURL + "/api/auth/logout", { withCredentials: true });
            console.log(response.data);
            if (setUserData) setUserData(null);
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
                <Link to="/" className="text-2xl font-extrabold text-black sm:text-3xl">
                    ShopTrack
                </Link>

                <div className="hidden md:flex space-x-6 font-medium text-gray-800">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <Link to="/collection" className="hover:text-black">Collection</Link>
                    <Link to="/about" className="hover:text-black">About</Link>
                    <Link to="/contact" className="hover:text-black">Contact</Link>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1 w-32 sm:w-40 md:w-56">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search products"
                            className="bg-gray-100 outline-none ml-2 text-sm w-full"
                        />
                    </div>

                    <div className="relative">
                        <div
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300"
                            onClick={toggleProfile}
                        >
                            {userData ? (
                                <span className="font-semibold text-gray-800">
                                    {userData.name.charAt(0).toUpperCase()}
                                </span>
                            ) : (
                                <FaUser className="text-gray-600" />
                            )}
                        </div>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                                {userData ? (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-700">
                                            <p className="font-semibold">{userData.name}</p>
                                            <p className="text-xs text-gray-500">{userData.email}</p>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={toggleProfile}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => {
                                                toggleProfile();
                                                handleLogout();
                                            }}
                                        >
                                            Logout
                                        </button>
                                        <div className="px-4 py-2 text-sm text-gray-600">
                                            <p>Last Login: {new Date().toLocaleString()}</p>
                                        </div>
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

                    <FaHeart className="text-gray-700 cursor-pointer hover:text-black" size={20} />

                    <div className="relative cursor-pointer">
                        <FaShoppingBag className="text-gray-700 hover:text-black" size={20} />
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            0
                        </span>
                    </div>

                    <button
                        className="md:hidden text-gray-700 hover:text-black focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    <button
                        className="md:hidden text-gray-700 hover:text-black focus:outline-none"
                        onClick={toggleSearch}
                        aria-label="Toggle search"
                    >
                        <FaSearch size={20} />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="flex flex-col space-y-4 px-4 py-4">
                        <Link
                            to="/"
                            className="text-gray-800 font-medium hover:text-black"
                            onClick={toggleMobileMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/collection"
                            className="text-gray-800 font-medium hover:text-black"
                            onClick={toggleMobileMenu}
                        >
                            Collection
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-800 font-medium hover:text-black"
                            onClick={toggleMobileMenu}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-800 font-medium hover:text-black"
                            onClick={toggleMobileMenu}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}

            {isSearchOpen && (
                <div className="md:hidden bg-white shadow-md px-4 py-3">
                    <div className="flex items-center bg-gray-100 rounded-md px-3 py-1">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search products"
                            className="bg-gray-100 outline-none ml-2 text-sm w-full"
                            onBlur={() => setIsSearchOpen(false)}
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;