import { Router } from "express";
import * as ctrl from "../controllers/PublicControllers.js"
import { addToCart, removeFromCart} from "../controllers/PublicControllers.js"
const router = Router();

router.get('/', ctrl.getIndexPageView)
router.get('/about', ctrl.getAboutPageView)
router.get('/contacts', ctrl.getContactPageView)
router.get('/store/category/', ctrl.getStorePageView)
router.get('/store/category/:slug', ctrl.getStorePageView)

router.get('/store/product/:slug', ctrl.getProductPageView)

router.post('/cart/add', addToCart)
router.post('/cart/remove', removeFromCart)

router.get('/cart', ctrl.getCartPageView)
router.get('/order', ctrl.getOrderPageView)

export default router;