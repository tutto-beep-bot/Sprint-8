import { Router } from "express";
import { getDeliveries, postDelivery, putDelivery, deleteDelivery } from "../controllers/delivery";

const router = Router();

router.get('/', getDeliveries);
router.post('/', postDelivery);
router.put('/:id', putDelivery);
router.delete('/:id', deleteDelivery);

export default router;