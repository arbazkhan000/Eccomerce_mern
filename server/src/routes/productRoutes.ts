import express from "express";
import { productController } from "../controller/productController";
import { isAdmin, protect } from "../middleware/middelware";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.get("/products/:id",  productController.getProductById);
router.post(
    "/products",
    protect,
    isAdmin,
    upload.array("images", 5),
    productController.createProduct
);
router.put(
    "/products/:id",
    protect,
    isAdmin,
    upload.array("images", 5),
    productController.updateProduct
);
router.delete(
    "/products/:id",
    protect,
    isAdmin,
    productController.deleteProduct
);

export default router;
