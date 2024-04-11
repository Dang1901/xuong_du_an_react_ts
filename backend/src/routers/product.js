import { Router } from "express";
import { add, getAll, getById, remove, update } from "../controllers/product";
const router = Router();

router.get('/products', getAll);
router.get('/products/:id', getById);
router.post('/products', add);
router.delete('/products/:id', remove);
router.put('/products/:id', update);

export default router;