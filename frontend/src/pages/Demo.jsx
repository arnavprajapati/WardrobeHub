import React, { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../context/ShopContext.jsx';
import Card from '../components/Card.jsx';

const Demo = () => {
    const { products } = useContext(ShopDataContext);
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [sortType, setSortType] = useState('relevance');
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const categories = ['All', 'Men', 'Women', 'Kids'];
    const subCategories = ['All', 'TopWear', 'BottomWear', 'WinterWear'];

    useEffect(() => {
        let productCopy = [...products];

        if (search) {
            productCopy = productCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category && category !== 'All') {
            productCopy = productCopy.filter((item) => item.category === category);
        }

        if (subCategory && subCategory !== 'All') {
            productCopy = productCopy.filter((item) => item.subCategory === subCategory);
        }

        if (minPrice !== '' && !isNaN(minPrice)) {
            productCopy = productCopy.filter((item) => item.price >= Number(minPrice));
        }
        if (maxPrice !== '' && !isNaN(maxPrice)) {
            productCopy = productCopy.filter((item) => item.price <= Number(maxPrice));
        }

        if (sortType === 'low-high') {
            productCopy.sort((a, b) => a.price - b.price);
        } else if (sortType === 'high-low') {
            productCopy.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(productCopy);
    }, [products, category, subCategory, search, minPrice, maxPrice, sortType]);

    const hasFilters = category !== '' || subCategory !== '' || minPrice !== '' || maxPrice !== '';

    const FilterContent = () => (
        <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md border border-gray-100 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">Filters</h2>
            <div className="w-full space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Category
                    </h3>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Subcategory
                    </h3>
                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {subCategories.map((subCat) => (
                            <option key={subCat} value={subCat}>
                                {subCat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Price Range
                    </h3>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>
            {hasFilters && (
                <button
                    onClick={() => {
                        setCategory('');
                        setSubCategory('');
                        setMinPrice('');
                        setMaxPrice('');
                    }}
                    className="mt-6 w-full py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 ease-in-out"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );

    // Sort Content Component (restored from original UI)
    const SortContent = () => (
        <div className="p-4 rounded-lg bg-white shadow-md">
            <h2 className="text-lg text-center font-semibold mb-3">Sort By</h2>
            <div>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="relevance">Relevance</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                </select>
            </div>
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
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Explore Products</h1>
                            <p className="text-sm text-gray-500">Upgrade your wardrobe with our new arrivals</p>
                        </div>
                        <div className="mt-4 lg:mt-0 lg:block hidden">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md mr-2"
                            />
                            <SortContent />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => <Card key={product._id} product={product} />)
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No products found. Try adjusting your filters.
                            </div>
                        )}
                    </div>

                    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between items-center z-10">
                        <div className="flex-1 mr-2">
                            <button
                                onClick={() => setShowSortMenu(true)}
                                className="w-full text-gray-700 font-medium flex items-center justify-center"
                            >
                                ↑ Sort By
                            </button>
                        </div>
                        <div className="flex-1 ml-2">
                            <button
                                onClick={() => setShowFilterMenu(true)}
                                className="w-full text-gray-700 font-medium flex items-center justify-center"
                            >
                                Filter
                                {hasFilters && <span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block"></span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showSortMenu && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={() => setShowSortMenu(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md max-h-[90%] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 text-2xl"
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
                        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md max-h-[90%] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 text-2xl"
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

export default Demo;