import { Router } from "express";
import { createProduct, getProducts, deleteProduct, updateProduct  } from "../controllers/productControllers";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;