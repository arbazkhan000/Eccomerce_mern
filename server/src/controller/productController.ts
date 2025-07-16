import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import fs from "fs";
import Product from "../schema/productSchema";
import { ApiError } from "../utils/ApiError";
import { productCreateValidation } from "../utils/validation";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface UploadResult {
  url: string;
  public_id: string;
}

const uploadToCloudinary = (
    file: Express.Multer.File
): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "luxe_products",
                transformation: { width: 800, height: 800, crop: "limit" },
            },
            (error, result) => {
                if (error || !result) {
                    console.error("Cloudinary Upload Error:", error);
                    return reject(new ApiError(500, "Image upload failed."));
                }

                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        stream.end(file.buffer); 
    });
};



const cleanupTempFiles = (files: Express.Multer.File[]) => {
  for (const file of files) {
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
        console.log(`Deleted temp file: ${file.path}`);
      }
    } catch (cleanupError) {
      console.error(" File cleanup failed:", {
        file: file.path,
        message: cleanupError instanceof Error ? cleanupError.message : cleanupError,
      });
    }
  }
};

export class productController {
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find();

      if (!products || products.length === 0) {
        throw ApiError.NotFound("No products found in the database.");
      }

      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        count: products.length,
        data: products,
      });
    } catch (error) {
      console.error("[ProductController:getAllProducts]", error);
      if (error instanceof ApiError) throw error;
      throw ApiError.InternalServerError("Failed to retrieve products.");
    }
  }

  static async createProduct(req: Request, res: Response): Promise<void> {
    const files = req.files as Express.Multer.File[];
    try {
      const parsed = productCreateValidation.safeParse(req.body);
      if (!parsed.success) {
        throw ApiError.ValidationError(
          "Product data validation failed. Please check all required fields.",
          parsed.error.errors
        );
      }

      if (!files || files.length === 0) {
        throw ApiError.BadRequest("Product images are required. Please upload at least one image.");
      }

      // Try uploading all images to Cloudinary, clean up multer files if any upload fails
      let uploadResults;
      try {
        const uploadPromises = files.map((file) => uploadToCloudinary(file));
        uploadResults = await Promise.all(uploadPromises);
      } catch (uploadError) {
        if (files && files.length > 0) cleanupTempFiles(files);
        throw uploadError; 
      }
      const imageObjects = uploadResults.map((result) => ({
        url: result.url,
        public_id: result.public_id,
      }));

      const { title, category, price, description, stock } = parsed.data;

      const newProduct = new Product({
        title,
        category,
        price,
        description,
        stock,
        images: imageObjects, 
      });

      await newProduct.save();

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (error) {
      // Only clean up files if not already done
      if (files && files.length > 0 && error.message !== "Cloudinary upload error") cleanupTempFiles(files);
      console.error("[ProductController:createProduct]", error);
      if (error instanceof ApiError) throw error;
      throw ApiError.InternalServerError("Failed to create product.");
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, category, price, description, stock } = req.body;
    const files = req.files as Express.Multer.File[];

    try {
      const product = await Product.findById(id);
      if (!product) throw ApiError.NotFound(`No product found with ID: ${id}`);

      const updateFields: Record<string, any> = {};
      if (title) updateFields.title = title;
      if (category) updateFields.category = category;
      if (price) updateFields.price = Number(price);
      if (description) updateFields.description = description;
      if (stock) updateFields.stock = Number(stock);

      // If new images are uploaded, delete old images from Cloudinary and upload new ones
      if (files && files.length > 0) {
        // Delete old images from Cloudinary
        if (product.images && Array.isArray(product.images)) {
          for (const image of product.images) {
            if (image.public_id) {
              try {
                await cloudinary.uploader.destroy(image.public_id);
              } catch (cloudErr) {
                console.error(`Failed to delete image from Cloudinary: ${image.public_id}`, cloudErr);
              }
            }
          }
        }
        // Upload new images
        const uploadPromises = files.map((file) => uploadToCloudinary(file));
        const uploadResults = await Promise.all(uploadPromises);
        updateFields.images = uploadResults.map((result) => ({
          url: result.url,
          public_id: result.public_id,
        }));
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      if (files && files.length > 0) cleanupTempFiles(files);
      console.error("[ProductController:updateProduct]", error);
      if (error instanceof ApiError) throw error;
      throw ApiError.InternalServerError(`Failed to update product with ID: ${id}`);
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) throw ApiError.NotFound("Product not found");

      // Delete images from Cloudinary
      if (product.images && Array.isArray(product.images)) {
        for (const image of product.images) {
          if (image.public_id) {
            try {
              await cloudinary.uploader.destroy(image.public_id);
            } catch (cloudErr) {
              console.error(`Failed to delete image from Cloudinary: ${image.public_id}`, cloudErr);
            }
          }
        }
      }

      await Product.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Product and its images deleted successfully",
      });
    } catch (error) {
      console.error("[ProductController:deleteProduct]", error);
      if (error instanceof ApiError) throw error;
      throw ApiError.InternalServerError("Failed to delete product.");
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) throw ApiError.NotFound("Product not found");

      res.status(200).json({
        success: true,
        message: "Product details retrieved successfully",
        data: product,
      });
    } catch (error: any) {
      if (error.name === "CastError") {
        throw ApiError.BadRequest("Invalid product ID format");
      }
      console.error("[ProductController:getProductById]", error);
      if (error instanceof ApiError) throw error;
      throw ApiError.InternalServerError("Failed to retrieve product details.");
    }
  }
}
