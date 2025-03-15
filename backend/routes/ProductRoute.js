import express from "express";
const router = express.Router();
import { getProducts , addProduct, deleteProduct, updateProduct, getProductById , searchProducts} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";  

router.get("/", getProducts); // ✅ Products Fetch (Category & Section ke basis par)
router.get("/search", searchProducts); // ✅ Search Products

router.get("/:id", getProductById); // ✅ Get Single Product by ID
router.post("/add", upload.single("img"), addProduct); // ✅ Add Product (Multer se image upload)
router.put("/:id", upload.single("img"), updateProduct); // ✅ Update Product
router.delete("/delete/:id", deleteProduct); // ✅ Delete Product


// ✅ Edit Product
// router.get("/edit/:id", editProduct);

export default router;

 