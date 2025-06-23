import { Router } from "express";
import { getLocations, postLocation } from '../controllers/location'

const router = Router();

router.get('/', getLocations);
router.post('/', postLocation);

export default router;

