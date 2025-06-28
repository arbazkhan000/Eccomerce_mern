import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../schema/productSchema.ts";

// Configure Cloudinary (should be in a separate config file)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface IProductImage {
    url: string;
    public_id: string;
}

/**
 * Controller for handling product-related operations
 */
class ProductController {
    /**
     * Get all products
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with product list or error message
     */
    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await Product.find();

            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully",
                count: products.length,
                data: products,
            });
        } catch (error) {
            console.error("Get products error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve products",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    /**
     * Create a new product with image
     * @param {Request} req - Express request object with file
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with created product or error message
     */
    static async createProduct(req: Request, res: Response) {
        const { title, category, price, description, stock } = req.body;
        const file = req.file;

        try {
            // Validate required fields
            if (!title || !category || !price || !description || !stock) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Title, category, price, description, and stock are required",
                });
            }

            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: "Product image is required",
                });
            }

            // Upload image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: "products",
                resource_type: "image",
            });

            const productImage: IProductImage = {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            };

            // Create new product
            const newProduct = new Product({
                title,
                category,
                price: Number(price),
                description,
                stock: Number(stock),
                image: productImage,
            });

            await newProduct.save();

            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: newProduct,
            });
        } catch (error) {
            console.error("Create product error:", error);

            // Cleanup uploaded file if creation fails
            if (file) {
                try {
                    await cloudinary.uploader.destroy(file.filename);
                } catch (uploadError) {
                    console.error(
                        "Failed to cleanup uploaded image:",
                        uploadError
                    );
                }
            }

            return res.status(500).json({
                success: false,
                message: "Failed to create product",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    /**
     * Update product and/or image
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with updated product or error message
     */
    static async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { title, category, price, description, stock } = req.body;
        const file = req.file;

        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            const updateFields: Record<string, any> = {};

            if (title) updateFields.title = title;
            if (category) updateFields.category = category;
            if (price) updateFields.price = Number(price);
            if (description) updateFields.description = description;
            if (stock) updateFields.stock = Number(stock);

            // Handle image update if file exists
            if (file) {
                // Upload new image
                const uploadResult = await cloudinary.uploader.upload(
                    file.path,
                    {
                        folder: "products",
                        resource_type: "image",
                    }
                );

                // Delete old image if exists
                if (product.images?.public_id) {
                    await cloudinary.uploader.destroy(product.images.public_id);
                }

                updateFields.images = {
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                };
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                updateFields,
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct,
            });
        } catch (error) {
            console.error("Update product error:", error);

            // Cleanup uploaded file if update fails
            if (file) {
                try {
                    await cloudinary.uploader.destroy(file.filename);
                } catch (uploadError) {
                    console.error(
                        "Failed to cleanup uploaded image:",
                        uploadError
                    );
                }
            }

            return res.status(500).json({
                success: false,
                message: "Failed to update product",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    /**
     * Delete a product and its image
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with success message or error
     */
    static async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // Delete image from Cloudinary if exists
            if (product.images?.public_id) {
                await cloudinary.uploader.destroy(product.images.public_id);
            }

            // Delete product from database
            await Product.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            });
        } catch (error) {
            console.error("Delete product error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to delete product",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    /**
     * Get product details by ID
     * @param {Request} req - Express request object with product ID parameter
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with product details or error message
     */
    static async getProductById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Product details retrieved successfully",
                data: product,
            });
        } catch (error) {
            console.error("Get product by ID error:", error);

            // Handle CastError for invalid ID format
            if (error.name === "CastError") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product ID format",
                });
            }

            return res.status(500).json({
                success: false,
                message: "Failed to retrieve product details",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}

export default ProductController;
