import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="font-sans min-h-screen bg-gray-50 text-gray-800">
            <div className="relative h-[28rem] sm:h-[32rem] bg-cover bg-center flex items-center justify-center" 
                 style={{ backgroundImage: "url('https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fuploads%2Fcampaign%2Four-story-innovation-1501593008.png%3Ftr%3Dq-90&w=640&q=75')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative text-white text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fadeInDown">
                        Our Story: Crafting Quality with Care
                    </h1>
                    <p className="text-lg sm:text-xl font-light max-w-2xl mx-auto animate-fadeInUp">
                        We are passionate about creating products that bring joy and style to your life.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-20">
                    <div className="md:w-1/2 md:pr-10 mb-8 md:mb-0">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our mission is simple: to offer **beautiful, high-quality products** that are made with integrity and a deep respect for our community and environment. We believe that great design and ethical practices can go hand-in-hand.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img 
                            src="https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fuploads%2Fcampaign%2Four-story-1501569294.png&w=750&q=75" 
                            alt="Our Mission" 
                            className="w-full h-80 object-cover rounded-lg shadow-lg" 
                        />
                    </div>
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-black transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                            <h3 className="text-xl font-bold mb-2">Uncompromising Quality</h3>
                            <p className="text-gray-600">
                                We source the finest materials to ensure every product you receive is crafted to perfection and built to last.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-black transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                            <h3 className="text-xl font-bold mb-2">Customer First</h3>
                            <p className="text-gray-600">
                                Your satisfaction is our top priority. We're here to help you every step of the way, from browsing to after-sales support.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-black transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                            <h3 className="text-xl font-bold mb-2">Mindful Creation</h3>
                            <p className="text-gray-600">
                                We are committed to sustainable and ethical practices, ensuring our work has a positive impact on the world.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center py-12 bg-gray-100 rounded-lg shadow-inner">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                        Ready to Find Your Next Favorite Thing?
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Explore our thoughtfully curated collection and discover products you'll love.
                    </p>
                    <Link
                        to="/collection"
                        className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300 cursor-pointer"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;