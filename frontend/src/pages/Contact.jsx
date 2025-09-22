import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa'; 

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <div className="font-sans min-h-screen bg-gray-50 text-gray-800 pt-20">
            <div className="relative h-72 bg-cover bg-center flex items-center justify-center filter grayscale"
                style={{ backgroundImage: "url('https://i.pinimg.com/1200x/d7/c8/cc/d7c8cc4a611f7cddec61446ea78e233e.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-60"></div> 
                <div className="relative text-white text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fadeInDown">
                        Let's Connect
                    </h1>
                    <p className="text-lg sm:text-xl font-light max-w-2xl mx-auto animate-fadeInUp">
                        We're here to help and answer any question you might have.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-gray-900">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                            Reach Out To Us
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Whether you have an inquiry about an order, a collaboration proposal, or just want to share your thoughts, our team is ready to listen.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-gray-700 text-2xl mr-4" /> {/* Changed icon color */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Our Address</h3>
                                    <p className="text-gray-600">WardrobeTrend HQ, 456 Style Avenue, Fashion District, New Delhi 110001</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-gray-700 text-2xl mr-4" /> {/* Changed icon color */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Customer Support</h3>
                                    <p className="text-gray-600">+91 98765 43210 (Mon-Sat, 10 AM - 6 PM)</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-gray-700 text-2xl mr-4" /> {/* Changed icon color */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600">hello@wardrobetrend.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect on Social Media</h3>
                            <div className="flex space-x-6 justify-center md:justify-start">
                                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500 transition-colors duration-300">
                                    <FaWhatsapp size={30} />
                                </a>
                                <a href="https://instagram.com/your_wardrobetrend" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors duration-300">
                                    <FaInstagram size={30} />
                                </a>
                                <a href="https://twitter.com/your_wardrobetrend" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
                                    <FaTwitter size={30} />
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <img
                                src="https://www.bewakoof.com/_next/image?url=https%3A%2F%2Fimages.bewakoof.com%2Fweb%2Fairoplane.png&w=640&q=75" 
                                alt="Paper Plane Flying"
                                className="w-56 h-auto animate-fly subtle-shadow-animation" 
                            />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-gray-900"> 
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                            Send Us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 sm:text-sm transition-colors duration-200"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 sm:text-sm transition-colors duration-200"
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 sm:text-sm transition-colors duration-200"
                                    placeholder="Regarding an order / General inquiry"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700 sm:text-sm transition-colors duration-200"
                                    placeholder="Type your message here..."
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;