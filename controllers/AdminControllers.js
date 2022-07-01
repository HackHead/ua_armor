import mongoose from "mongoose";
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import Mail from '../models/Mail.js'
import {productValidation, mailValidation} from '../validations/SchemaValidation.js'
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
        name: 'dashboard'
    };
    res.render('admin/route-pages/dashboard', {data: page})
}

// Страница со списком товаров в админке
export const getAdminProductsView = async (req, res) => {
    const products = await Product.find().limit(20)
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'products',
        products: products || null,
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
        name: 'contacts'
    };
    res.render('admin/route-pages/contacts', {data: page})
}

// Страница редактирования существуюющего товара в админке
export const getProductEditView = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({_id: id}).exec();
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'product-edit',
        product: product
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
        name: 'misc'
    };
    res.render('admin/route-pages/misc', {data: page})
}

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
    };
    res.render('admin/route-pages/product-new.pug', {data: page})
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
         hidden: Boolean(req.body.category),
         running_out: Boolean(req.body.runnig_out),
         new: Boolean(req.body.new),
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
        hidden: Boolean(req.body.category),
        running_out: Boolean(req.body.runnig_out),
        new: Boolean(req.body.new),
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

    const newMail = new Mail(mailData).save();
    res.send('Повідомлення успішно надіслано')
}



export const createCategory = async (req, res) => {
    console.log(req.body)
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
            return res.status(200).send(category)
        }
    })
}