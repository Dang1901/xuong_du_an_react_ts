import { Router } from 'express';
import { addItemToCart, decreaseProductQuantity, getCartByUserId, increaseProductQuantity, removeFromCart, updateproductQuantity } from '../controllers/cart';

const router = Router();
router.get("/cart/:userId", getCartByUserId);
router.post("/cart/add-to-cart", addItemToCart);
router.post("/cart/update-product-quantity", updateproductQuantity);
router.delete("/cart/remove-cart", removeFromCart);
router.post("/cart/increase", increaseProductQuantity);
router.post("/cart/decrease", decreaseProductQuantity);



export default router;