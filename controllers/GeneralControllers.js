import mongoose from "mongoose";
import Product from '../models/Product.js'
import Comment from '../models/Comment.js'
import Category from "../models/Category.js";
import { request } from 'express'
import misc from "../config/misc.js";
import { productValidation } from '../validations/SchemaValidation.js'


export const getIndexPageView = async (req, res) => {
    const slider_products = await Product.find({show_in_index_slider: true});
    const catalog_products = await Product.find({show_in_index_catalog: true}).populate('category');
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'home',
        slider_products: slider_products,
        catalog_products: catalog_products,
        misc: misc
    };
    res.render('generall/route-pages/index', {data: page})
}

export const getAboutPageView = (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'about',
        misc: misc
    };
    res.render('generall/route-pages/about', {data: page})
}

export const getContactPageView = (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'about',
        misc: misc
    };
    res.render('generall/route-pages/contacts', {data: page})
}
export const getStorePageView = async (req, res) => {
    const products = await Product.find().limit(20)
    const categories = await Category.find();
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'about',
        products: products,
        categories: categories,
        misc: misc
    };
    res.render('generall/route-pages/store', {data: page})
}
export const getProductPageView = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id}).populate('category');
    const allCategories = await Category.find();
    const allComments = await Comment.find({productId: req.params.id});
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'single-product',
        product: product,
        categories: allCategories,
        comments: allComments,
        misc: misc
    };
    res.render('generall/route-pages/single-product', {data: page})
}

