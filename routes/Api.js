import { Router } from "express";
import {getCart, addToCart, removeFromCart, deleteCategory, getDeleteCategoryView, createOrder} from "../controllers/Api.js"
import { isStaff } from "../middleware/Auth.js";

const router = Router();

router.get('/admin/category/delete',isStaff, getDeleteCategoryView)
router.get('/api/cart/all', getCart);
router.post('/api/cart/add', addToCart);
router.post('/api/cart/remove', removeFromCart);
router.post('/api/category/delete', deleteCategory)
router.post('/api/order/create', createOrder)

export default router;