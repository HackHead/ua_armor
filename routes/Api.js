import { Router } from "express";
import {getCart, addToCart,getSlidesPagesView, deleteSlide, removeFromCart, deleteCategory, getDeleteCategoryView, createOrder, getOrdersPageView} from "../controllers/Api.js"
import { isStaff } from "../middleware/Auth.js";

const router = Router();

router.get('/admin/category/delete',isStaff, getDeleteCategoryView)
router.get('/api/cart/all', getCart);
router.post('/api/cart/add', addToCart);
router.post('/api/cart/remove', removeFromCart);
router.post('/api/category/delete', deleteCategory)

router.post('/api/order/create', createOrder)
router.get('/admin/orders/all',isStaff, getOrdersPageView)
router.get('/admin/slides/all', isStaff, getSlidesPagesView)
router.get('/admin/slide/delete/:id', isStaff, deleteSlide)
export default router;