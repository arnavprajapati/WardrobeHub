import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';

function Lists() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState(null);

    const { serverURL } = useContext(authDataContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverURL}/api/product/getproducts`, { withCredentials: true });
            setProducts(response.data);
        } catch (error) {
            console.log("fetchProducts error", error);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${serverURL}/api/product/deleteproduct/${id}`, { withCredentials: true });
            setProducts(products.filter(product => product._id !== id));
            setSelectedForDelete(null);
            setShowModal(false);
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log("deleteProduct error", error);
            toast.error("Failed to delete product");
        } finally {
            setLoading(false);
        }
    };

    const handleDetails = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
        setSelectedForDelete(null);
    };

    // Stock badge
    const getStockBadge = (stock) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
        }`}>
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
    );

    // Bestseller badge
    const getBestSellerBadge = (bestseller) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Yes
        </span>
    );

    return (
        <div className="h-[calc(100vh-5rem)] mt-18 pt-6 bg-gray-50 text-gray-800">
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                    <h2 className="text-xl font-semibold">Products List</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition">
                            Filter
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition">
                            See All
                        </button>
                        <button className="px-4 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition">
                            + Add Product
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 w-10">
                                        {/* Checkbox header */}
                                    </th>
                                    <th className="px-8 py-3">Product</th>
                                    {/* Hide these columns on mobile */}
                                    <th className="px-4 py-3 hidden sm:table-cell">Category</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Subcategory</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Price</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Stock</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                                            <div className="flex justify-center items-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                                <span>Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                                            No products found.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedForDelete === product._id}
                                                    onChange={(e) => {
                                                        setSelectedForDelete(e.target.checked ? product._id : null);
                                                        if (!e.target.checked) closeModal();
                                                    }}
                                                    className="w-4 h-4 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-4 py-3 flex items-center gap-3">
                                                <img
                                                    src={product.image1}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-md border"
                                                />
                                                <span className="font-medium">{product.name}</span>
                                            </td>
                                            {/* Hide these columns on mobile */}
                                            <td className="px-4 py-3 text-sm hidden sm:table-cell">{product.category}</td>
                                            <td className="px-4 py-3 text-sm hidden sm:table-cell">{product.subCategory}</td>
                                            <td className="px-4 py-3 text-sm font-medium hidden sm:table-cell">₹{product.price.toLocaleString()}</td>
                                            <td className="px-4 py-3 hidden sm:table-cell">{getStockBadge(product.stock)}</td>
                                            <td className="px-4 py-3">
                                                {selectedForDelete === product._id ? (
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        disabled={loading}
                                                        className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                                                    >
                                                        Delete
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDetails(product)}
                                                        className="text-purple-600 hover:text-purple-800 font-medium text-sm transition"
                                                    >
                                                        Details
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <div className="p-6 pb-0">
                            <img
                                src={selectedProduct.image1}
                                alt={selectedProduct.name}
                                className="w-full h-48 object-contain rounded-lg border"
                            />
                        </div>

                        <div className="p-6 pt-3">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                            <p className="text-gray-600 text-base mb-4">{selectedProduct.description}</p>
                            <p className="text-gray-500 text-sm mb-4"><strong>Material:</strong> {selectedProduct.subDescription}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-700 font-medium">Category:</p>
                                    <p className="text-gray-600">{selectedProduct.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Subcategory:</p>
                                    <p className="text-gray-600">{selectedProduct.subCategory}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Price:</p>
                                    <p className="text-gray-600">₹{selectedProduct.price.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Sizes:</p>
                                    <p className="text-gray-600">{selectedProduct.sizes.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Stock:</p>
                                    <p className="text-gray-600">{getStockBadge(selectedProduct.stock)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Best Seller:</p>
                                    <p className="text-gray-600">{getBestSellerBadge(selectedProduct.bestseller)}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500">
                                    Added on: {new Date(selectedProduct.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="w-full mt-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Lists;