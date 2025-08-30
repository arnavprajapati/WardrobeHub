import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopDataContext } from "../context/ShopContext.jsx";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetail = () => {
    const { products, addCart, loading } = useContext(ShopDataContext);
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    useEffect(() => {
        const found = products.find((p) => p._id === productId);
        if (found) {
            setProductData(found);
            setImage(found.image1 || found.image2 || found.image3 || found.image4 || '');
            if (found.sizes && found.sizes.length > 0) {
                setSize(found.sizes[0]);
            }
        }
    }, [productId, products]);

    if (loading || !productData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <ClipLoader color="#000000" size={40} />
            </div>
        );
    }

    const availableImages = [
        productData.image1,
        productData.image2,
        productData.image3,
        productData.image4,
    ].filter(Boolean);

    return (
        <div className="relative lg:top-[70px] top-[360px] w-full flex items-center justify-center h-[calc(100vh-70px)] py-4 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl overflow-hidden max-w-7xl w-full p-6 md:p-10 border border-gray-200 shadow-md">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
                    <div className="flex flex-col space-y-4 md:w-1/2">
                        <div className="w-full h-[400px] lg:h-[450px] rounded-lg overflow-hidden border flex items-center justify-center border-gray-300">
                            {image ? (
                                <img
                                    src={image}
                                    alt={productData.name}
                                    className="w-full h-full object-contain cursor-pointer"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No Image</span>
                            )}
                        </div>
                        <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                            {availableImages.map((imgUrl, index) => (
                                <button
                                    key={index}
                                    onClick={() => setImage(imgUrl)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                                        image === imgUrl
                                            ? 'border-black ring-2 ring-gray-800'
                                            : 'border-gray-200 hover:border-gray-500'
                                    }`}
                                >
                                    <img src={imgUrl} alt={`thumbnail ${index + 1}`} className="w-full h-full object-cover cursor-pointer" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 md:w-1/2 pt-4 md:pt-0">
                        <p className="text-sm text-gray-600">
                            {productData.subDescription || 'Soft Cotton Regular Fit'}
                        </p>

                        <h1 className="text-3xl md:text-4xl text-black leading-tight">
                            {productData.name}
                        </h1>

                        <p className="text-3xl text-gray-800">
                            ₹{productData.price}
                        </p>

                        <div className="border-t border-gray-200 pt-4">
                            <h2 className="text-lg text-black mb-2">Product Details</h2>
                            <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {productData.description || "A timeless white tee made from 100% cotton, perfect for casual and everyday wear."}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 -mt-1">
                            <label className="text-sm text-gray-700">Select Size</label>
                            <div className="flex gap-3 mt-4">
                                {productData.sizes && productData.sizes.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`w-14 h-14 rounded-full text-sm transition-all duration-200 ${
                                            item === size
                                                ? 'bg-gray-800 text-white border-2 border-black shadow-md'
                                                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                                        }`}
                                        onClick={() => setSize(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => addCart(productData._id, size)}
                            disabled={loading || !size}
                            className="bg-gray-800 hover:bg-black disabled:bg-gray-500 text-white py-3 px-8 rounded-lg shadow-md w-full mt-6 transition-colors duration-200 flex items-center justify-center"
                        >
                            {loading ? <ClipLoader size={16} color="white" /> : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
