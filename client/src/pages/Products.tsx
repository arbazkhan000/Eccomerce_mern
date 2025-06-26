import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../demoData";

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [sortBy, setSortBy] = useState<string>("default");

    const productsLoading = false; // You can connect to real API later

    // Filter products by selected category
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    // Sort filtered products
    let sortedProducts = [...filteredProducts];
    if (sortBy === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <motion.div
            className="container mx-auto px-4 md:px-6 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-3xl md:text-4xl font-semibold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                All Products
            </motion.h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <motion.div
                    className="md:w-1/4 lg:w-1/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="sticky top-20">
                        <div className="mb-8">
                            <h3 className="text-lg font-medium mb-4">
                                Categories
                            </h3>
                            <div className="space-y-2">
                                <Button
                                    variant={
                                        selectedCategory === null
                                            ? "default"
                                            : "outline"
                                    }
                                    className="w-full justify-start"
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    All
                                </Button>
                                {categories?.map((category) => (
                                    <Button
                                        key={category.id}
                                        variant={
                                            selectedCategory === category.id
                                                ? "default"
                                                : "outline"
                                        }
                                        className="w-full justify-start"
                                        onClick={() =>
                                            setSelectedCategory(category.id)
                                        }
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-medium mb-4">
                                Sort By
                            </h3>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">Default</option>
                                <option value="price-asc">
                                    Price: Low to High
                                </option>
                                <option value="price-desc">
                                    Price: High to Low
                                </option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Product Grid */}
                <motion.div
                    className="md:w-3/4 lg:w-4/5"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {productsLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-80 bg-gray-100 rounded-lg animate-pulse"
                                ></div>
                            ))}
                        </div>
                    ) : sortedProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium">
                                No products found
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Try changing your filters
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory + sortBy}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {sortedProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Products;
