import { Router } from "express";
import { getIndexPageView, getAboutPageView, getContactPageView, getStorePageView, getProductPageView } from "../controllers/GeneralControllers.js"

const router = Router();

router.get('/', getIndexPageView)
router.get('/about', getAboutPageView)
router.get('/contacts', getContactPageView)
router.get('/store', getStorePageView)
router.get('/store/:slug', getProductPageView)
export default router;