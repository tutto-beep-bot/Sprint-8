import { Router } from "express";
import { deleteProduct, getProduct, getProducts } from "../controllers/product";

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct)

export default router;