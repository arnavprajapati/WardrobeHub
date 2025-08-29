import React, { useContext, useState } from 'react';
import upload from '../assets/upload image.jpg';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function Add() {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [subDescription, setSubDescription] = useState("");
    const [category, setCategory] = useState("Men");
    const [price, setPrice] = useState("");
    const [subCategory, setSubCategory] = useState("TopWear");
    const [bestseller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { serverURL } = useContext(authDataContext);

    const handleAddProduct = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const formData = new FormData();
            const data = {
                name,
                description,
                subDescription,
                price,
                category,
                subCategory,
                bestseller,
                sizes: JSON.stringify(sizes),
                image1,
                image2,
                image3,
                image4
            };

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const result = await axios.post(serverURL + "/api/product/addproduct", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            console.log(result.data);
            toast.success("ADD Product Successfully");
            setLoading(false);

            if (result.data) {
                setName("");
                setDescription("");
                setSubDescription("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice("");
                setBestSeller(false);
                setCategory("Men");
                setSubCategory("TopWear");
                setSizes([]);
            }
        } catch (error) {
            console.error("Frontend error:", error.response?.data || error.message);
            setLoading(false);
            toast.error("Add Product Failed");
        }
    };

    return (
        <div className="h-[calc(100vh-150px)] md:h-[calc(100vh-5rem)] mt-18 pt-6 bg-gray-100 text-gray-800 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-3 flex flex-col lg:flex-row gap-20">

                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">Upload Images</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {['image1', 'image2', 'image3', 'image4'].map((img, index) => (
                            <label
                                key={img}
                                htmlFor={img}
                                className="w-full h-36 cursor-pointer border-2 border-gray-300 rounded-lg hover:border-blue-400 transition flex items-center justify-center bg-white"
                            >
                                <img
                                    src={
                                        eval(img)
                                            ? URL.createObjectURL(eval(img))
                                            : upload
                                    }
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <input
                                    type="file"
                                    id={img}
                                    hidden
                                    onChange={(e) => {
                                        if (img === 'image1') setImage1(e.target.files[0]);
                                        if (img === 'image2') setImage2(e.target.files[0]);
                                        if (img === 'image3') setImage3(e.target.files[0]);
                                        if (img === 'image4') setImage4(e.target.files[0]);
                                    }}
                                    required
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <form
                    onSubmit={handleAddProduct}
                    className="w-full lg:w-2/3 flex flex-col gap-3"
                >
                    <h2 className="text-xl font-semibold">Add Product</h2>
                    <div className="flex flex-col gap-1">
                        <label className="text-base font-semibold">Product Name</label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="w-full max-w-sm p-2 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none bg-white"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-20">
                        <div className="flex flex-col gap-1 w-full sm:w-1/2">
                            <label className="text-base font-semibold">Product Description</label>
                            <textarea
                                placeholder="Type here"
                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none bg-white h-25"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full sm:w-1/2">
                            <label className="text-base font-semibold">Sub-Product Description</label>
                            <textarea
                                placeholder="Type here"
                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none bg-white h-16"
                                onChange={(e) => setSubDescription(e.target.value)}
                                value={subDescription}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-20">
                        <div className="flex flex-col gap-1 w-full sm:w-1/2">
                            <label className="text-base font-semibold">Product Category</label>
                            <select
                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none bg-white"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 w-full sm:w-1/2">
                            <label className="text-base font-semibold">Sub-Category</label>
                            <select
                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none bg-white"
                                onChange={(e) => setSubCategory(e.target.value)}
                                value={subCategory}
                            >
                                <option value="TopWear">TopWear</option>
                                <option value="BottomWear">BottomWear</option>
                                <option value="WinterWear">WinterWear</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-base font-semibold">Product Price</label>
                        <input
                            type="number"
                            placeholder="₹ 2000"
                            className="w-full max-w-sm p-2 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none bg-white"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-base font-semibold">Product Size</label>
                        <div className="flex gap-2 flex-wrap">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <div
                                    key={size}
                                    className={`px-3 py-1 rounded-lg border-2 border-gray-300 cursor-pointer transition ${
                                        sizes.includes(size)
                                            ? 'bg-green-400 text-black border-blue-400'
                                            : 'bg-white text-gray-800 hover:border-blue-400'
                                    }`}
                                    onClick={() =>
                                        setSizes((prev) =>
                                            prev.includes(size)
                                                ? prev.filter((item) => item !== size)
                                                : [...prev, size]
                                        )
                                    }
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="w-5 h-5 cursor-pointer mt-3"
                            onChange={() => setBestSeller((prev) => !prev)}
                            checked={bestseller}
                        />
                        <label htmlFor="checkbox" className="text-base font-semibold mt-3">
                            Add to BestSeller
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-28 p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-700 transition flex items-center justify-center gap-2 mt-3"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Add;