import mongoose from "mongoose";


export interface IProductImage {
    url: string;
    public_id: string;
    altText?: string;
}
// 


const productSchema = new mongoose.Schema(
    {
        images: {
            type: [
                {
                    url: {
                        type: String,
                        required: [true, "Image URL is required"],
                    },
                    public_id: {
                        type: String,
                        required: [true, "Cloudinary public ID is required"],
                    },
                    altText: {
                        type: String,
                        default: "Product image",
                        maxlength: [
                            100,
                            "Alt text cannot exceed 100 characters",
                        ],
                    },
                },
            ],
        },

        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
            maxlength: [120, "Title cannot exceed 120 characters"],
            index: true,
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            enum: [
                "All",
                "Electronics",
                "Footwear",
                "Accessories",
                "Bags",
                "Fashion",
                "Mobiles & Tablets",
            ],
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0.99, "Minimum product price is $0.99"],
            max: [9999.99, "Maximum product price is $9999.99"],
            set: (v: number) => parseFloat(v.toFixed(2)), // Always store 2 decimal places
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            maxlength: [2000, "Description cannot exceed 2000 characters"],
            minlength: [20, "Description should be at least 20 characters"],
        },
        stock: {
            type: Number,
            required: [true, "Product stock quantity is required"],
            min: [0, "Stock cannot be negative"],
            max: [1000, "Maximum stock limit is 1000 units"],
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
