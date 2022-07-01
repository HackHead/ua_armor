import { Router } from "express";
import { getAdminDashboardView, getAdminProductsView, createProduct, getProductEditView, deleteProduct, updateProduct } from "../controllers/AdminControllers.js";
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

router.get('/admin/contacts', (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'contacts'
    };
    res.render('admin/route-pages/contacts', {data: page})
})

router.get('/admin/misc', (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'misc'
    };
    res.render('admin/route-pages/misc', {data: page})
})


router.get('/admin/products', getAdminProductsView)

router.get('/admin/product/new', (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'product-new'
    };
    res.render('admin/route-pages/product-new.pug', {data: page})
})

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

router.get('/admin/products/providers', (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'providers'
    };
    res.render('admin/route-pages/providers', {data: page})
})

router.post('/product/create', upload.array('images', 10), createProduct)
router.post('/product/:id/update', upload.array('images', 10), updateProduct)
router.get('/admin/product/:id/edit', getProductEditView)
router.get('/admin/product/:id/delete', deleteProduct)
export default router;