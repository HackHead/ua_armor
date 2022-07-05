import { Router } from "express";
import * as ctrl from "../controllers/PublicControllers.js"

const router = Router();

router.get('/', ctrl.getIndexPageView)
router.get('/about', ctrl.getAboutPageView)
router.get('/contacts', ctrl.getContactPageView)
router.get('/store', ctrl.getStorePageView)
router.get('/store/:slug', ctrl.getProductPageView)
export default router;