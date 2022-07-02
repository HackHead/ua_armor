import { Router } from "express";
import { createCategory, newComment, getAdminCommentsView, updateMisc, getAdminDashboardView,getNewCategoryView, getAdminProductsView, createProduct, getProductEditView, deleteProduct, updateProduct, newUserMail, getAdminContactsView, getAdminMiscView, getAdminProductView, getLoginView } from "../controllers/AdminControllers.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname.replace(/\$\s\@\#\%\^\&\*\(\)\*/, ""));
    }
});

const upload = multer({storage: storage});
const router = Router();

router.get('/admin', getAdminDashboardView);

router.get('/admin/contacts', getAdminContactsView)

router.get('/admin/misc', getAdminMiscView)


router.get('/admin/products', getAdminProductsView)

router.get('/admin/product/new', getAdminProductView)

router.get('/admin/products/comments', getAdminCommentsView)

router.get('/admin/categories/new', getNewCategoryView)

router.post('/product/create', upload.array('images', 10), createProduct);
router.post('/product/:id/update', upload.array('images', 10), updateProduct);
router.get('/admin/product/:id/edit', getProductEditView);
router.get('/admin/product/:id/delete', deleteProduct);
router.post('/product/category/create', createCategory)

router.post('/admin/mail/users/new', newUserMail);
router.post('/comment/new', newComment);
router.post('/admin/misc/update/:target', updateMisc)
router.get('/login', getLoginView)

export default router;