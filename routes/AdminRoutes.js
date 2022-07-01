import { Router } from "express";
import { createCategory, getAdminDashboardView,getNewCategoryView, getAdminProductsView, createProduct, getProductEditView, deleteProduct, updateProduct, newUserMail, getAdminContactsView, getAdminMiscView, getAdminProductView } from "../controllers/AdminControllers.js";
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

router.get('/admin/products/comments', (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'comments'
    };
    res.render('admin/route-pages/comments', {data: page})
})

router.get('/admin/categories/new', getNewCategoryView)

router.post('/product/create', upload.array('images', 10), createProduct);
router.post('/product/:id/update', upload.array('images', 10), updateProduct);
router.get('/admin/product/:id/edit', getProductEditView);
router.get('/admin/product/:id/delete', deleteProduct);
router.post('/admin/mail/users/new', newUserMail);
router.post('/product/category/create', createCategory)

export default router;