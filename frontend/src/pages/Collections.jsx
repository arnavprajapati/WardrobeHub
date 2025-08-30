import React, { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import Card from '../components/Card.jsx';

const Collections = () => {
    const { products } = useContext(ShopDataContext);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');
    const [search, setSearch] = useState('');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const categories = ['Men', 'Women', 'Kids'];
    const subCategories = ['TopWear', 'BottomWear', 'WinterWear'];

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    useEffect(() => {
        let productCopy = [...products];

        if (search) {
            productCopy = productCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            productCopy = productCopy.filter((item) => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
        }

        if (sortType === 'low-high') {
            productCopy.sort((a, b) => a.price - b.price);
        } else if (sortType === 'high-low') {
            productCopy.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(productCopy);
    }, [products, category, subCategory, search, sortType]);

    const hasFilters = category.length > 0 || subCategory.length > 0;

    const clearAllFilters = () => {
        setCategory([]);
        setSubCategory([]);
    };

    const FilterContent = () => (
        <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md border border-gray-100 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">Filters</h2>
            <div className="w-full space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 text-center">
                        Category
                    </h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto px-2">
                        {categories.map((cat) => (
                            <div key={cat} className="flex items-center justify-start hover:bg-gray-50 rounded px-3 py-1 transition">
                                <input
                                    type="checkbox"
                                    id={`cat-${cat}`}
                                    value={cat}
                                    checked={category.includes(cat)}
                                    onChange={toggleCategory}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                                />
                                <label htmlFor={`cat-${cat}`} className="ml-3 text-sm font-medium text-gray-700">
                                    {cat}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 text-center">
                        Subcategory
                    </h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto px-2">
                        {subCategories.map((subCat) => (
                            <div key={subCat} className="flex items-center justify-start hover:bg-gray-50 rounded px-3 py-1 transition">
                                <input
                                    type="checkbox"
                                    id={`subcat-${subCat}`}
                                    value={subCat}
                                    checked={subCategory.includes(subCat)}
                                    onChange={toggleSubCategory}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                                />
                                <label htmlFor={`subcat-${subCat}`} className="ml-3 text-sm font-medium text-gray-700">
                                    {subCat}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {hasFilters && (
                <button
                    onClick={clearAllFilters}
                    className="mt-6 w-full py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 ease-in-out text-center"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );

    const SortContent = () => (
        <div className="p-4 rounded-lg bg-white flex items-center justify-center">
            <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="bg-white w-full md:w-[250px] h-[50px] px-[15px] text-gray-800 rounded-lg hover:border-[#46d1f7] border-[2px] text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="relavent">Sort By: Relavent</option>
                <option value="low-high">Sort By: Low to High</option>
                <option value="high-low">Sort By: High to Low</option>
            </select>
        </div>
    );

    return (
        <div className="collections-page mt-20 px-4 pb-16">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="hidden lg:block w-80 flex-shrink-0 fixed top-0 left-0 h-screen overflow-y-auto">
                    <div className="pt-20">
                        <FilterContent />
                    </div>
                </div>

                <div className="flex-1 lg:ml-80">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-6 px-4 lg:px-0">
                        <div className="text-center lg:text-left">
                            <h1 className="text-2xl font-bold">Explore Products</h1>
                            <p className="text-sm text-gray-500">Upgrade your wardrobe with our new arrivals</p>
                        </div>
                        <div className="mt-4 lg:mt-0 flex-col lg:flex-row gap-4 items-center w-full lg:w-auto hidden lg:flex">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-white w-full lg:w-[250px] h-[50px] px-[15px] text-gray-800 rounded-lg hover:border-[#46d1f7] border-[2px] text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <SortContent />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start lg:gap-28 gap-6 px-4 lg:px-0">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                                >
                                    <Card product={product} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-10 text-gray-500">
                                No products found. Try adjusting your filters.
                            </div>
                        )}
                    </div>

                    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-center items-center gap-6 z-10">
                        <button
                            onClick={() => setShowSortMenu(true)}
                            className="w-1/2 text-gray-700 font-medium flex items-center justify-center py-2 border border-gray-300 rounded-lg"
                        >
                            ↑ Sort By
                        </button>
                        <button
                            onClick={() => setShowFilterMenu(true)}
                            className="w-1/2 text-gray-700 font-medium flex items-center justify-center py-2 border border-gray-300 rounded-lg"
                        >
                            Filter
                            {hasFilters && <span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block"></span>}
                        </button>
                    </div>
                </div>
            </div>

            {showSortMenu && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={() => setShowSortMenu(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md max-h-[90%] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-700"
                            onClick={() => setShowSortMenu(false)}
                        >
                            ×
                        </button>
                        <SortContent />
                    </div>
                </div>
            )}

            {showFilterMenu && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={() => setShowFilterMenu(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md max-h-[90%] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-700"
                            onClick={() => setShowFilterMenu(false)}
                        >
                            ×
                        </button>
                        <FilterContent />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collections;