import mongoose from "mongoose";
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import Comment from '../models/Comment.js'
import Mail from '../models/Mail.js'
import User from '../models/User.js'
import Role from '../models/Role.js'
import misc from "../config/misc.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {productValidation, mailValidation, commentValidation, loginValidation, registrationValidatation} from '../validations/SchemaValidation.js'
import slugify from "slugify";
//============================
//          Страницы         =
//============================

// Главная страница админки
export const getAdminDashboardView = (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'dashboard',
        misc: misc
    };
    res.render('admin/route-pages/dashboard', {data: page})
}

// Страница со списком товаров в админке
export const getAdminProductsView = async (req, res) => {
    const products = await Product.find().populate('category').limit(20)
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'products',
        products: products || null,
        misc: misc,
    };
    res.render('admin/route-pages/products', {data: page})
}


// Страница с контактами в админке
export const getAdminContactsView = (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'contacts',
        misc: misc
    };
    res.render('admin/route-pages/contacts', {data: page})
}

// Страница редактирования существуюющего товара в админке
export const getProductEditView = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({_id: id}).populate('category').exec();
    const categories = await Category.find();
    
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'product-edit',
        product: product,
        categories: categories,
        misc: misc
    };
    res.render('admin/route-pages/product-edit', {data: page})
}


// Страница "разное" в админке
export const getAdminMiscView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'misc',
        misc: misc
    };
    res.render('admin/route-pages/misc', {data: page})
}
export const getAdminCommentsView = async (req, res) => {
    const comments = await Comment.find().limit(20).populate('product');
    const commentProducts = []
    for(let comm of comments){
        commentProducts.push(comm._id)
    };
    

    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'comments',
        misc: misc,
        comments: comments
    };
    res.render('admin/route-pages/comments', {data: page})
};
// Страница с одним товаром в админке
export const getAdminProductView = async (req, res) => {
    const categories = await Category.find();
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'product-new',
        categories: categories,
        misc: misc,
    };
    res.render('admin/route-pages/product-new.pug', {data: page})
}

export const getNewCategoryView = async(req, res) => {
    const categories = await Category.find();
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'product-new',
        categories: categories,
        misc: misc,
    };
    res.render('admin/route-pages/category-new.pug', {data: page})
}
//============================
//         Endpoints         =
//============================

// Endpoint для удаления товара
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.deleteOne({_id: id}).exec();
    res.redirect('/admin/products')
}

// Enpoint для создания товара
export const createProduct = async (req, res) => {
    const {error} = productValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };
    // Массив з шляхами файлів, який ми будемо передавати в базу даних
    const filePaths = []
    req.files.forEach((file) => {
        let name = file.path;
        filePaths.push(name)
    })
    // Нове оголошення
    const product = new Product({
         name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         sale: req.body.sale,
         category: req.body.category,
         hidden: Boolean(req.body.hidden),
         running_out: Boolean(req.body.runnig_out),
         new: Boolean(req.body.new),
         slug: slugify(req.body.name),
         customers_choice: Boolean(req.body.customers_choice),
         show_in_index_slider: Boolean(req.body.show_in_index_slider),
         show_in_index_catalog: Boolean(req.body.show_in_index_catalog),
         images: filePaths,
    });
    
    try {
        const savedProduct = await product.save(); // Зберігаємо оголошення в БД
        res.status(200).redirect('/admin/products');
    } catch(err){
        res.status(400).send(err)
    }
}

// Endpoint для обновления товара
export const updateProduct = async (req, res) => {
    // const id = req.params.id;
    const {error} = productValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };
    let update;
    if(req.files.length){
        const filePaths = []
        req.files.forEach((file) => {
            let name = file.path;
            filePaths.push(name)
        });
        update.images = filePaths
    }
    const filter = {_id: req.params.id};
    update = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sale: req.body.sale,
        category: req.body.category,
        hidden: Boolean(req.body.hidden),
        running_out: Boolean(req.body.runnig_out),
        new: Boolean(req.body.new),
        slug: slugify(req.body.name),
        customers_choice: Boolean(req.body.customers_choice),
        show_in_index_slider: Boolean(req.body.show_in_index_slider),
        show_in_index_catalog: Boolean(req.body.show_in_index_catalog),
   };

    try {
        await Product.findOneAndUpdate(filter, update);
        res.status(200).redirect('/admin/products');
    } catch(err){
        res.status(400).send(err)
    }
}

// Endpoint для отправки письма от пользователей
export const newUserMail = async (req, res) => {
    const {error} = mailValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };
    const mailData = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };

    const newMail = await new Mail(mailData).save();
    res.send('Повідомлення успішно надіслано')
}

export const newComment = async (req, res) => {
    const {error} = commentValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };
    const commentData = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        rate: req.body.rate,
        product: req.body.product
    };

    const newComment = await new Comment(commentData).save();
    res.send('Ваш коментар успішно опублікований')
}
export const deleteComment = async(req, res) => {
    console.log(req.params.id)
    const comment = await Comment.findOne({_id: req.params.id}).remove();

    res.redirect('/admin/products/comments')
}

export const createCategory = async (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    };

    const cat = await new Category(categoryObj).save((error, category) => {
        if(error) return res.status(400).send(error);
        if(category) {
            return res.status(200).redirect('/admin/categories/new')
        }
    })
}

export const updateMisc = async (req, res) => {
    const target = req.params.target;
    switch (target) {
        case 'instagram': 
            misc.contacts.instagram = req.body.link;
            break;
        case 'telegram': 
            misc.contacts.telegram = req.body.link;
            break;
        case 'viber': 
            misc.contacts.viber = req.body.link;
            break;
        case 'phone': 
            misc.contacts.phone = req.body.phone;
            break;
        case 'email': 
            misc.contacts.email = req.body.email;
            break;
        case 'address': 
            misc.contacts.city = req.body.city;
            misc.contacts.street = req.body.street;
    };
    res.status(200).redirect('/admin/contacts')
}

export const getLoginView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'comments',
        misc: misc,
    };
    res.render('admin/route-pages/login', {data: page})
}

export const signInAdmin = async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Account with this email does not exist');
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // Створення і присвоєня токену
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.cookie('auth_token', token, { maxAge: 86400000, httpOnly: true });
    res.status(200).redirect('/admin');
}

export const newStaff = async (req, res) => {
    // Валідація введених користувачем даних
    const { error } = registrationValidatation(req.body);
    // Якщо дані введено неправильно - повернути помилку
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // Перевірка чи заданий користувачем e-mail іже існує
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already exists');

    // Хешування пароля
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Створюємо екземпляр класу користувача
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role
    });

    // Зберігаємо дані про користувача в базі
    try {
        const savedUser = await user.save();
        res.status(200).redirect('/admin')
        
    } catch(err){
        res.status(400).send(err)
    }
}

export const getNewStaffView = async (req, res) => {
    const roles = await Role.find();
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'create-user',
        misc: misc,
        roles: roles
    };
    res.render('admin/route-pages/staff-new', {data: page})
};
export const getAllUsers = async(req,  res) => {
    const users = await User.find().populate('role')
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'users',
        misc: misc,
        users: users
    };
    res.render('admin/route-pages/users', {data: page})
}
export const getStaffList = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'comments',
        misc: misc,
    };
    res.render('admin/route-pages/staff-new', {data: page})
};