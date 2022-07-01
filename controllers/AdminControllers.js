import mongoose from "mongoose";
import Product from '../models/Product.js'
import {productValidation} from '../validations/SchemaValidation.js'
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
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.deleteOne({_id: id}).exec();
    res.redirect('/admin/products')
}

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