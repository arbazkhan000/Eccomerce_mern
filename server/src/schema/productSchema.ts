import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    images: {
        type: [String], // ➤ Change from String to [String] to store multiple image URLs
        validate: [
            {
                validator: (val: string[]) => val.length >= 2,
                message: "Minimum images are 2",
            },
            {
                validator: (val: string[]) => val.length <= 5,
                message: "Maximum images are 5", // ✅ Fixed typo
            },
        ],
        required: [true, "Images are required"],
    },

    title: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        enum: [
            "All",
            "Electronics",
            "Footwear",
            "Accessories",
            "Bags",
            "Fashion",
            "Mobiles & Tablets",
        ],
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        min: 1,
        max: 20,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
