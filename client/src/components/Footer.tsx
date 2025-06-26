import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-display font-semibold text-xl mb-4">
                            LUXE
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Curated collections of premium products for your
                            lifestyle.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-lg mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-600 hover:text-black"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/categories"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Featured
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-600 hover:text-black"
                                >
                                    New Arrivals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-lg mb-4">About</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Press
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-lg mb-4">
                            Customer Service
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-black"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Shipping & Returns
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500">
                        &copy; {new Date().getFullYear()} LUXE. All rights
                        reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-600 hover:text-black">
                            Instagram
                        </a>
                        <a href="#" className="text-gray-600 hover:text-black">
                            Twitter
                        </a>
                        <a href="#" className="text-gray-600 hover:text-black">
                            Facebook
                        </a>
                        <a href="#" className="text-gray-600 hover:text-black">
                            Pinterest
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
