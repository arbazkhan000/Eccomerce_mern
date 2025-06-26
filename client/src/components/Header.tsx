import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge, ShoppingCart } from "lucide-react";
import type { RootState } from "../redux/store/cartStore";

import { useSelector } from "react-redux";

const Header:React.FC =()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
      const items = useSelector((state: RootState) => state.cart.items);
  

    const menuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: "auto" },
    };

    return (
        <motion.nav
            className="sticky top-0 w-full bg-white z-50 border-b"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center h-16">
                    <Link
                        to="/"
                        className="text-xl md:text-2xl font-display font-semibold"
                    >
                        LUXE
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        <Link
                            to="/"
                            className="font-medium hover:text-black/70 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="font-medium hover:text-black/70 transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            to="/categories"
                            className="font-medium hover:text-black/70 transition-colors"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/about"
                            className="font-medium hover:text-black/70 transition-colors"
                        >
                            About
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative">
                            <ShoppingCart className="h-6 w-6" />
                            {items.length > 0 && (
                                <div className="absolute -top-2 -right-2 h-5 w-5 text-xs rounded-full bg-black text-white flex items-center justify-center">
                                    {items.length}
                                </div>
                            )}
                        </Link>

                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <motion.span
                                    className="w-full h-0.5 bg-black block"
                                    animate={
                                        isMenuOpen
                                            ? { rotate: 45, y: 8 }
                                            : { rotate: 0, y: 0 }
                                    }
                                ></motion.span>
                                <motion.span
                                    className="w-full h-0.5 bg-black block"
                                    animate={
                                        isMenuOpen
                                            ? { opacity: 0 }
                                            : { opacity: 1 }
                                    }
                                ></motion.span>
                                <motion.span
                                    className="w-full h-0.5 bg-black block"
                                    animate={
                                        isMenuOpen
                                            ? { rotate: -45, y: -8 }
                                            : { rotate: 0, y: 0 }
                                    }
                                ></motion.span>
                            </div>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={menuVariants}
                        >
                            <div className="flex flex-col space-y-4 py-4">
                                <Link
                                    to="/"
                                    className="font-medium px-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/products"
                                    className="font-medium px-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/categories"
                                    className="font-medium px-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Categories
                                </Link>
                                <Link
                                    to="/about"
                                    className="font-medium px-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );

}


export default Header ;