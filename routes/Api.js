import { Router } from "express";
import {getCart, addToCart, removeFromCart} from "../controllers/Api.js"
const router = Router();

router.get('/api/cart/all', getCart);
router.post('/api/cart/add', addToCart);
router.post('/api/cart/remove', removeFromCart);
export default router;