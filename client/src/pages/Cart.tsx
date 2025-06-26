import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { clearCart, removeFromCart, updateQuantity } from "../redux/slice/cartSlice";
import type { RootState } from "../redux/store/cartStore";

// If RootState is not exported from cartStore, define it here:
// type RootState = ReturnType<typeof cartStore.getState>;

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);

    const cartTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
            },
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.3,
            },
        },
    };

    const updateQuantityHandler = (id: number, quantity: number) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ id, quantity }));
    };

    const removeItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const clearCartHandler = () => {
        dispatch(clearCart());
    };

    return (
        <motion.div
            className="container mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">
                Your Cart
            </h1>

            {items.length === 0 ? (
                <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex justify-center mb-6">
                        <ShoppingCart className="h-16 w-16 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-medium mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Looks like you haven't added any products to your cart
                        yet.
                    </p>
                    <Link to="/products">
                        <Button>Continue Shopping</Button>
                    </Link>
                </motion.div>
            ) : (
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
                    {/* Cart Items Table */}
                    <motion.div
                        className="lg:col-span-2 overflow-x-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Mobile: Card layout, Desktop: Table layout */}
                        <div className="hidden sm:block border rounded-lg overflow-hidden min-w-[340px]">
                            <div className="bg-gray-50 px-4 py-3 border-b">
                                <div className="grid grid-cols-12 gap-4 text-base">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-2 text-center">Price</div>
                                    <div className="col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 text-right">Total</div>
                                </div>
                            </div>
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="px-4 py-4 border-b last:border-b-0"
                                        variants={itemVariants}
                                        exit="exit"
                                    >
                                        <div className="grid grid-cols-12 gap-4 items-center text-base">
                                            <div className="col-span-6">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={`${item.image}?w=100&h=100&auto=format`}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                    <div>
                                                        <Link
                                                            to={`/products/${item.title}`}
                                                            className="font-medium hover:underline"
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                ${item.price.toFixed(2)}
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() =>
                                                            updateQuantityHandler(
                                                                item.id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <span>{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() =>
                                                            updateQuantityHandler(
                                                                item.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <div className="flex items-center justify-end space-x-4">
                                                    <span>
                                                        $
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                        className="text-gray-400  hover:text-red-500"
                                                    >
                                                        <X />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {/* Mobile Card Layout */}
                        <div className="sm:hidden space-y-4">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="flex flex-col border rounded-lg shadow-sm p-4 gap-3"
                                        variants={itemVariants}
                                        exit="exit"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`${item.image}?w=100&h=100&auto=format`}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <Link
                                                    to={`/products/${item.title}`}
                                                    className="font-medium hover:underline"
                                                >
                                                    {item.title}
                                                </Link>
                                                <div className="text-gray-500 text-sm mt-1">
                                                    ${item.price.toFixed(2)} each
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 ml-2"
                                            >
                                                <X />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() =>
                                                        updateQuantityHandler(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <span>{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() =>
                                                        updateQuantityHandler(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </div>
                                            <div className="font-semibold">
                                                ${ (item.price * item.quantity).toFixed(2) }
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="outline"
                                onClick={clearCartHandler}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </motion.div>

                    {/* Order Summary - stack below on mobile */}
                    <motion.div
                        className="lg:col-span-1 w-full max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="border rounded-lg p-4 sm:p-6 mt-8 lg:mt-0">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 border-b pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-semibold text-base sm:text-lg">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <Button className="w-full mt-6">
                                Proceed to Checkout
                            </Button>

                            <div className="mt-6">
                                <Link
                                    to="/products"
                                    className="text-sm text-center block text-gray-500 hover:text-black"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Cart;
