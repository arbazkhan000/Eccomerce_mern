import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { categories } from "../demoData";

const Categories: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);
   

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
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
                Shop by Category
            </motion.h1>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="h-64 bg-gray-200 rounded-lg animate-pulse"
                        ></div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {categories?.map((category) => (
                        <motion.div
                            key={category.id}
                            className="group relative h-80 overflow-hidden rounded-lg"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={`${category.image}?w=600&auto=format`}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                                <h3 className="text-2xl font-semibold mb-2">
                                    {category.name}
                                </h3>
                                
                                {/* <Link to={`/categories/${category.id}`}> */}
                                    <Button
                                        variant="outline"
                                        className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                                    >
                                        Shop {category.name}
                                    </Button>
                                {/* </Link> */}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Categories;
