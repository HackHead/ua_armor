import { Router } from "express";
import { getStaffList,signInAdmin, newStaff, getNewStaffView,getAllUsers, createCategory, newComment, getAdminCommentsView, updateMisc, getAdminDashboardView,getNewCategoryView, getAdminProductsView, createProduct, getProductEditView, deleteProduct, updateProduct, newUserMail, getAdminContactsView, getAdminMiscView, getAdminProductView, getLoginView, deleteComment } from "../controllers/AdminControllers.js";
import { isStaff } from "../middleware/Auth.js";
import { v4 as uuidv4 } from 'uuid';

import multer from "multer";
import path from "path";

import Role from "../models/Role.js"

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

router.get('/admin',isStaff, getAdminDashboardView);
router.get('/admin/contacts',isStaff, getAdminContactsView)
router.get('/admin/misc',isStaff, getAdminMiscView)
router.get('/admin/products',isStaff, getAdminProductsView)
router.get('/admin/product/new',isStaff, getAdminProductView)
router.get('/admin/products/comments',isStaff, getAdminCommentsView)
router.get('/admin/categories/new',isStaff, getNewCategoryView)
router.get('/admin/product/:id/delete',isStaff, deleteProduct);
router.get('/admin/product/:id/edit',isStaff, getProductEditView);
router.get('/login', getLoginView)
router.get('/comment/delete/:id',isStaff, deleteComment)
router.get('/admin/staff/new',isStaff, getNewStaffView)
router.get('/admin/users',isStaff, getAllUsers)

router.post('/product/create',isStaff, upload.array('images', 10), createProduct);
router.post('/product/:id/update',isStaff, upload.array('images', 10), updateProduct);
router.post('/product/category/create',isStaff, createCategory)
router.post('/admin/mail/users/new',isStaff, newUserMail);
router.post('/comment/new',isStaff, newComment);
router.post('/admin/misc/update/:target',isStaff, updateMisc)
router.post('/admin/signin', signInAdmin)
router.post('/admin/staff/new',isStaff, newStaff)

// router.post('/role/create', async(req, res) => {
//     const role = {
//         name: req.body.name,
//         role: req.body.role,
//         isStaff: req.body.isStaff
//     };
//     new Role(role).save();
//     res.send("Role created")
// })
export default router;