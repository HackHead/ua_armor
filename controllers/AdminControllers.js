import mongoose from "mongoose";

import Product from '../models/Product.js'
import Category from '../models/Category.js'
import Comment from '../models/Comment.js'
import Mail from '../models/Mail.js'
import User from '../models/User.js'
import Role from '../models/Role.js'
import Feature from '../models/Feature.js'
import Slide from '../models/Slide.js'
import Cart from '../models/Cart.js'
import Order from '../models/Order.js'

import misc from "../config/misc.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {productValidation,slideValidation, mailValidation, commentValidation, loginValidation, registrationValidatation, categoryValidation, featureValidation} from '../validations/SchemaValidation.js'
import slugify from "slugify";
import session from "express-session";
//============================
//          Страницы         =
//============================

// Главная страница админки
export const getAdminDashboardView = (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'dashboard',
        misc: misc,
        user: req.user,
    };
    console.log(req.user)
    res.render('admin/route-pages/dashboard', {data: page})
}

// Страница со списком товаров в админке
export const getAdminProductsView = async (req, res) => {
    const render = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'products',
        misc: misc,
        user: req.user,
    };
    try {
        const {page = 1, limit = 25} = req.query;
        const products = await Product.find().populate('category').skip((page - 1) * limit).limit(limit * 1).sort('-date');
        if(products) {
            render.products = products
            const count = await Product.count({});
            const paginationItems = Math.ceil(count / limit)
            render.paginationItems = paginationItems;
            render.pageNum = parseInt(page)
        }
    } catch (err) {
        const data = {
            message: 'Во время выполнения запроса произошла непредвиденная ошибка'
        }
        return res.status(400).render('admin/status-pages/400', {data: data});
    }
    res.render('admin/route-pages/products', {data: render})
}


// Страница с контактами в админке
export const getAdminContactsView = (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'contacts-edit',
        misc: misc,
        user: req.user,
    };
    res.render('admin/route-pages/contacts', {data: page})
}

// Страница редактирования существуюющего товара в админке
export const getProductEditView = async (req, res) => {
    const id = req.params?.id;
    let product;
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'product-edit',
        misc: misc,
        user: req.user,
        
    };
    try {
        product = await Product.findOne({_id: id}).populate('category');
        if(!product) {
            const data = {
                message: 'Продукта с таким идентификатором не найдено, попробуйте изменить параметры поиска'
            };
            
            return res.status(404).render('admin/status-pages/404', {data: data});
        };
        page.product = product;
        
    } catch (err) {
        const data = {
            message: 'Продукта с таким идентификатором не найдено, попробуйте изменить параметры поиска'
        }
        return res.status(404).render('admin/status-pages/404', {data: data});
    };

    try {
        const categories = await Category.find();
        if(!categories){
            const data = {
                message: 'На сайте пока не создано ни одной категории, перейдите во вкладку Товары / Создать категорию'
            };
            return res.status(400).render('admin/status-pages/400', {data: data});
        };
        page.categories = categories;
    } catch(err) {
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});;
    }
    try {
        const features = await Feature.find({product: product._id});
        if(features) page.features = features;
    } catch(err) {
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});;
    }
    res.render('admin/route-pages/product-edit', {data: page});
}


// Страница "разное" в админке
export const getAdminMiscView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'misc',
        misc: misc,
        user: req.user,
    };
    res.render('admin/route-pages/misc', {data: page})
}
export const getAdminCommentsView = async (req, res) => {
    const render = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'comments',
        misc: misc,
        user: req.user,
    };
    try {
        const {page = 1, limit = 25} = req.query;
        const comments = await Comment.find().populate('product').skip((page - 1) * limit).limit(limit * 1).sort('-date');;
        render.comments = comments;
        const count = await Comment.count({});
            const paginationItems = Math.ceil(count / limit)
            render.paginationItems = paginationItems;
            render.pageNum = parseInt(page)
    } catch (err) {
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});
    }
    
    res.render('admin/route-pages/comments', {data: render})
};
// Страница с одним товаром в админке
export const getAdminProductView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'product-new',
        misc: misc,
        user: req.user,
    };
    try {
        const categories = await Category.find();
        if(categories){
            page.categories = categories;
        }
    } catch (err) {
        const data = {
            message: 'Во время выполнения запроса произошла непредвиденная ошибка'
        }
        return res.status(400).render('admin/status-pages/400', {data: data});
    }
    res.render('admin/route-pages/product-new.pug', {data: page})
}

export const getNewCategoryView = async(req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'category-new',
        misc: misc,
        user: req.user,
    };
    try {
        const categories = await Category.find();
        if(categories){
            page.categories = categories;
        }
    } catch (err) {
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});
    }
    res.render('admin/route-pages/category-new.pug', {data: page})
}
//============================
//         Endpoints         =
//============================

// Endpoint для удаления товара
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params?.id;
        const product = await Product.findOne({_id: id}).populate('category').exec();
        await Cart.deleteMany({}); // Delete this
        
        const productsIDs = []
         productsIDs.push(product._id)

        await Comment.deleteMany(
            { "product": {$in: productsIDs} },
        ).populate('product');

        
        
        await Order.deleteMany({
            "products.productId": {$in: productsIDs}
        }).populate({path: 'products.productId'});
        
        await Order.deleteMany({
            "products.productId": {$in: productsIDs}
        }).populate({path: 'products.productId'});

        await Product.deleteOne({_id: product._id});

        await Category.findOneAndUpdate({_id: product.category._id}, {"$inc": {productsCount: -1}})
        res.redirect('/admin/products')
    } catch (err) {
        const data = {
            message: err
        }
        return res.status(400).render('admin/status-pages/400', {data: data});
    }
}

// Enpoint для создания товара
export const createProduct = async (req, res) => {
    const productValidationData = {
        name: req.body?.name,
        description: req.body?.description,
        price: req.body?.price,
        sale: req.body?.sale,
        category: req.body?.category,
        hidden: req.body?.hidden,
        new: req.body?.new,
        availability: req.body?.availability,
        customers_choice: req.body?.customers_choice,
        show_in_index_catalog: req.body?.show_in_index_catalog,
    }
    const {error} = productValidation(productValidationData);

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
         new: Boolean(req.body.new),
         slug: slugify(req.body.name),
         availability: req.body.availability,
         customers_choice: Boolean(req.body.customers_choice),
         show_in_index_catalog: Boolean(req.body.show_in_index_catalog),
         images: filePaths,
    });
    
    try {
        const savedProduct = await product.save(); // Зберігаємо оголошення в БД
        const productId = savedProduct._id;
        const featureValidationData = {
            product: productId,
            featureKeys: req.body.featureKeys,
            featureValues: req.body.featureValues
        }
        await Category.findOneAndUpdate({_id: req.body.category}, {"$inc": {productsCount: 1}})
        const {error} = featureValidation(featureValidationData);

        if(error){
            return res.status(400).send(error.details[0].message)
        };
        
        if(req.body?.featureKeys?.length && req.body?.featureValues?.length){
            if(req.body?.featureKeys?.length !== req.body?.featureValues?.length){
                return res.status(400).send('Количество ключей и названий характеристик не совпадает')
            }
            const insertData = []
            for(let i = 0; i <= req.body.featureKeys.length - 1; i++){
                const pushData = {
                    product: productId,
                    key: req.body.featureKeys[i],
                    value: req.body.featureValues[i],
                };
                if(pushData.key.length === 0 || pushData.value.length === 0) continue;
                insertData.push(pushData)
            };
            await Feature.insertMany(insertData)
        }
        
    } catch(err){
        const data = {
            message: err
        }
        return res.status(400).render('admin/status-pages/400', {data: data});
    }
    
    res.status(200).redirect('/admin/product/new');
}

// Endpoint для обновления товара
export const updateProduct = async (req, res) => {
    const productValidationData = {
        name: req.body?.name,
        description: req.body?.description,
        price: req.body?.price,
        sale: req.body?.sale,
        category: req.body?.category,
        hidden: req.body?.hidden,
        new: req.body?.new,
        availability: req.body?.availability,
        customers_choice: req.body?.customers_choice,
        show_in_index_catalog: req.body?.show_in_index_catalog,
    }
    const {error} = productValidation(productValidationData);

    if(error){
        return res.status(400).send(error.details[0].message)
    };
    let update = {};
    if(req.files.length){
        const filePaths = []
        req.files.forEach((file) => {
            let name = file.path;
            filePaths.push(name)
        });
        update.images = filePaths
    }
    const filter = {_id: req.params?.id};

    update.name = req.body.name;
    update.description =  req.body.description;
    update.price =  req.body.price;
    update.sale =  req.body.sale;
    update.category =  req.body.category;
    update.hidden =  Boolean(req.body.hidden);
    update.new =  Boolean(req.body.new);
    update.slug =  slugify(req.body.name);
    update.availability =  req.body.availability;
    update.customers_choice =  Boolean(req.body.customers_choice);
    update.show_in_index_catalog =  Boolean(req.body.show_in_index_catalog);
    
   const featuresValidationData = {
        product: req.params?.id,
        featureKeys: req.params.featureKeys,
        featureValues: req.params.featureValues
   }
    const {validerror} = featureValidation(featuresValidationData);
    if(validerror){
        return res.status(400).send(error.details[0].message)
    };
    try {
        const product = await Product.findOneAndUpdate(filter, update);
        if(!product) {
            return res.status(400).send('Товара с таким идентификатором не существует');
        }
        await Feature.deleteMany({product: req.params.id})
        
        if(req.body.featureKeys.length !== req.body.featureValues.length){
            return res.status(400).send('Количество ключей и названий характеристик не совпадает')
        }
        if(req.body.featureKeys.length && req.body.featureValues.length){
            const insertData = []
            for(let i = 0; i <= req.body.featureKeys.length - 1; i++){
                const pushData = {
                    product: req.params?.id,
                    key: req.body.featureKeys[i],
                    value: req.body.featureValues[i],
                };
                if(pushData.key.length === 0 || pushData.value.length === 0) continue;
                insertData.push(pushData)
            };
            await Feature.insertMany(insertData)
        }
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

    try {
        const newMail = await new Mail(mailData).save();
    } catch (error) {
        sendError()
    }
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
    try {
        await new Comment(commentData).save();
    } catch (err) {
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});;
    }
    res.send('Ваш коментар успішно опублікований')
}
export const deleteComment = async(req, res) => {
    
    try {
        Comment.findOne({_id: req.params?.id}).remove();
    } catch(err){
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});;
    }
    res.redirect('/admin/products/comments')
}

export const createCategory = async (req, res) => {
    const {error} = categoryValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    };
    try {
       const category = await new Category(categoryObj).save();
       if(category){
        return res.status(200).redirect('/admin/categories/new')
       }
    } catch (err) {
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});;
    }
}
export const createSlide = async (req, res) => {
    console.log(req.file)
    const slideValidationData = {
        title: req.body.title,
        button: req.body.button,
        description: req.body.description,
        link: req.body.link,
    }
    const {error} = slideValidation(slideValidationData);

    if(error){
        return res.status(400).send(error.details[0].message)
    };
    try {
        await new Slide({
            title: req.body.title,
            image: req.file?.path,
            button: req.body.button,
            description: req.body.description,
            link: req.body.link,
        }).save();
    } catch (err) {
        const data = {
            message: err
        }
        return res.status(400).render('admin/status-pages/400', {data: data})
    }
    res.redirect('/admin/slides/all')
}
export const updateMisc = async (req, res) => {
    const target = req.params.target;
    if(!target) {
        const data = {
            message: 'Данные с клиента не были переданы.'
        }
        return res.status(400).render('admin/status-pages/400', {data: data});
    }
    let redirect;
    try {
        switch (target) {
            case 'instagram': 
                misc.contacts.instagram = req.body.link;
                redirect = '/admin/contacts'
                break;
            case 'telegram': 
                misc.contacts.telegram = req.body.link;
                redirect = '/admin/contacts'
                break;
            case 'viber': 
                misc.contacts.viber = req.body.link;
                redirect = '/admin/contacts'
                break;
            case 'phone': 
                misc.contacts.phone = req.body.phone;
                redirect = '/admin/contacts'
                break;
            case 'email': 
                misc.contacts.email = req.body.email;
                redirect = '/admin/contacts'
                break;
            case 'address': 
                misc.contacts.city = req.body.city;
                misc.contacts.street = req.body.street;
                redirect = '/admin/contacts'
            case 'about': 
                misc.about = req.body.about;
                redirect = '/admin/misc'
                break;
            case 'footer':
                misc.footer = req.body.footer;
                redirect = '/admin/misc'
                break
            case 'favicon':
                misc.favicon = req.file.path;
                redirect = '/admin/misc'
                break
            case 'logo':
                misc.logo = req.file.path;
                redirect = '/admin/misc'
                break
            case 'inverse':
                misc.logoInverse = req.file.path;
                redirect = '/admin/misc'
                break
            case 'promotion':
                const body = JSON.parse(JSON.stringify(req.body))
                misc.promotion = {};
                misc.promotion.title = body.title;
                misc.promotion.deadline = body.deadline;
                misc.promotion.link = body.link;
                misc.promotion.button = body.button;
                misc.promotion.image = req.file.path;
                redirect = '/admin/misc'
                break
            case 'promotion-deactivate':
                misc.promotion = null;
                redirect = '/admin/misc'
                break;
        };
    } catch (err) {
        res.send(err)
    }
    res.status(200).redirect(redirect)
}

export const getLoginView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'login',
        misc: misc,
        user: req.user,
    };
    if(req.user) res.redirect('/admin')
    res.render('admin/route-pages/login', {data: page})
}

export const signInAdmin = async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).send('Account with this email does not exist');
        
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');

        // Створення і присвоєня токену
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        req.session.user = user._id;
        res.cookie('auth_token', token, { maxAge: 86400000, httpOnly: true });
        res.status(200).redirect('/admin');
    } catch (err) {
        const data = {
            message: err
        }
        return res.status(400).render('admin/status-pages/400', {data: data}); 
    }
}

export const newStaff = async (req, res) => {
    const { error } = registrationValidatation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

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
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'staff-new',
        misc: misc,
        user: req.user,
        roles: roles
    };
    res.render('admin/route-pages/staff-new', {data: page})
};
export const getAllUsers = async(req,  res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'users',
        misc: misc,
        user: req.user,
    };
    try {
        const users = await User.find().populate('role')
        if(users) {
            page.users = users
        }
    } catch (err) {
        const data = {
        message: 'Во время выполнения запроса произошла непредвиденная ошибка'
    }
    return res.status(400).render('admin/status-pages/400', {data: data});
    }
    
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
        user: req.user,
    };
    console.log(req.user)
    res.render('admin/route-pages/staff-new', {data: page})
};


 