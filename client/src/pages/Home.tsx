import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import ProductCard from "../components/ProductCard";
import { featuredProducts } from "../demoData";

const Home: React.FC = () => {
    const productsLoading = false;

    const uniqueCategory = [
        ...new Set(featuredProducts.map((item) => item.category)),
    ];

    console.log("Unique category :",uniqueCategory)

    const heroVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
            },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };
    return (
        <div>
            {/* Hero Section */}
            <motion.section
                className="relative h-[80vh] overflow-hidden bg-black text-white"
                initial="hidden"
                animate="visible"
                variants={heroVariants}
            >
                <div className="absolute inset-0">
                    <motion.img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"
                        alt="Modern store interior"
                        className="h-full w-full object-cover opacity-60"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    />
                </div>
                <div className="relative flex h-full items-center">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            className="max-w-lg"
                            variants={itemVariants}
                        >
                            <motion.h1
                                className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight mb-4"
                                variants={itemVariants}
                            >
                                Shop the Latest Trends
                            </motion.h1>
                            <motion.p
                                className="text-lg mb-8 text-white/80"
                                variants={itemVariants}
                            >
                                Discover curated collections of premium products
                                for your lifestyle
                            </motion.p>
                            <motion.div variants={itemVariants}>
                                <Link to="/products">
                                    <Button
                                        size="lg"
                                        className="bg-white text-black hover:bg-white/90 hover:text-black"
                                    >
                                        Shop Now
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Featured Products */}
            <motion.section
                className="py-16 md:py-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        className="flex flex-col items-center mb-12 text-center"
                        variants={itemVariants}
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                            Featured Products
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl">
                            Our curated selection of trending items just for you
                        </p>
                    </motion.div>

                    {productsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-80 bg-gray-100 rounded-lg animate-pulse"
                                ></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}

                    <motion.div
                        className="flex justify-center mt-12"
                        variants={itemVariants}
                    >
                        <Link to="/products">
                            <Button variant="outline" size="lg">
                                View All Products
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
                className="py-16 md:py-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row items-center rounded-2xl bg-black text-white overflow-hidden">
                        <motion.div
                            className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16"
                            variants={itemVariants}
                        >
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                                Join Our Newsletter
                            </h2>
                            <p className="text-lg mb-6 text-white/80">
                                Stay updated on new arrivals, seasonal
                                collections, and exclusive offers
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-3 flex-grow rounded-md text-black focus:outline-none"
                                />
                                <Button className="bg-white text-black hover:bg-white/90">
                                    Subscribe
                                </Button>
                            </form>
                        </motion.div>
                        <motion.div
                            className="w-full lg:w-1/2 relative h-80 lg:h-auto overflow-hidden"
                            variants={itemVariants}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170"
                                alt="Newsletter"
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
