import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { products } from "../demoData";
import { addToCart } from "../redux/slice/cartSlice";

const ProductDetail: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const product = products.find((p) => p.title === title);

    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity,
            })
        );

        toast("Product added to cart!"); // ✅
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="aspect-square bg-gray-200 rounded-lg"></div>
                        <div>
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                            <div className="h-10 bg-gray-200 rounded w-1/3 mt-6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-12 text-center">
                <h2 className="text-2xl font-semibold">Product not found</h2>
                <Link
                    to="/products"
                    className="text-blue-600 hover:underline mt-4 inline-block"
                >
                    Back to products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <Link
                to="/products"
                className="inline-flex items-center gap-2 mb-8 hover:underline"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to products</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Images */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selectedImage}
                                src={`${product.images[selectedImage]}?w=800&auto=format`}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, i) => (
                            <button
                                key={i}
                                className={`aspect-square rounded-md overflow-hidden border-2 ${
                                    selectedImage === i
                                        ? "border-black"
                                        : "border-transparent hover:border-gray-300"
                                }`}
                                onClick={() => setSelectedImage(i)}
                            >
                                <img
                                    src={`${image}?w=200&auto=format`}
                                    alt={`${product.title} thumbnail ${i + 1}`}
                                    className="h-full w-full object-cover object-center"
                                />
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-3xl font-semibold">{product.title}</h1>
                    <p className="text-xl font-medium my-2">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="my-8">
                        <h3 className="text-lg font-medium mb-2">
                            Description
                        </h3>
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    <div className="my-6">
                        <h3 className="text-lg font-medium mb-2">Quantity</h3>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                disabled={quantity <= 1}
                            >
                                -
                            </Button>
                            <span className="text-lg font-medium">
                                {quantity}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    <Button
                        className="mt-4 w-full md:w-auto"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
