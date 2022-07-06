 
// Importing models
import Product from '../models/Product.js'
import Comment from '../models/Comment.js'
import Category from "../models/Category.js";
import Feature from "../models/Feature.js";
import Slide from "../models/Slide.js";
import Cart from "../models/Cart.js";

import misc from "../config/misc.js";

export const getIndexPageView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'home',
        misc: misc,
        
    };
    try {
        const slides = await Slide.find();
        if(slides) page.slides = slides;

        const catalog_products = await Product.find({show_in_index_catalog: true}).populate('category');
        if(catalog_products) page.catalog_products = catalog_products;

        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID});
            page.cart = cart
            console.log(cart)
        }
        
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).send(err)
    }
    
    
    
    res.render('generall/route-pages/index', {data: page})
}

export const getAboutPageView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'about',
        misc: misc,
        
    };
    try {
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID});
            page.cart = cart
        }
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).send(err)
    }
    res.render('generall/route-pages/about', {data: page})
}

export const getContactPageView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'contacts',
        misc: misc,
        
    };
    try {
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID});
            page.cart = cart
            console.log(cart)
        }
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).send(err)
    }
    res.render('generall/route-pages/contacts', {data: page})
}















export const getStorePageView = async (req, res) => {
    
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'store',
        misc: misc,
        
    };

    try {
        const products = await Product.find().populate('category').skip(0).limit(20).sort('name');
        if(products) page.products = products;

        console.log(products)
        const categories = await Category.find();
        if(categories) page.categories = categories;
        
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID});
            page.cart = cart
            console.log(cart)
        }
    } catch (err) {
        res.status(400).render('generall/status-pages/400', {data: err})
    }

    res.render('generall/route-pages/store', {data: page})
}

export const getProductPageView = async (req, res) => {
    
    const page = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'product',
        misc: misc,
        
    };
    try {
        const product = await Product.findOne({slug: req.params.slug}).populate('category');
        
        if(product) {
            page.product = product;
        } else {
            res.status(404).render('generall/status-pages/404')
        };

        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID});
            page.cart = cart
            console.log(cart)
        }

        
        const features = await Feature.find({product: product._id});
        if(features) page.features = features;

        const relatedProducts = await Product.find({category: product.category._id}).populate('category').limit(6);
        if(relatedProducts) page.relatedProducts = relatedProducts;

        const allComments = await Comment.find({product: product._id});
        if(allComments) page.allComments = allComments;

    } catch (err) {
        res.status(400).send(err)
    }
    
    res.render('generall/route-pages/single-product', {data: page})
}


export const addToCart = async (req, res) => {
    console.log(req.sessionID)

   if(!req.session) return res.status(400).send({message: 'Session required'});
   const user = req.session?.user,
         ssid = req.sessionID;
   if(user){
    const cartExists = await Cart.findOne({user: user})
    if(!cartExists){
        const savedCart = await new Cart({
            user: user,
            session: ssid,
            products: [
                {productId: req.body.product, quantity: req.body.quantity || 1}
            ],
        }).save()

        req.session.cart = savedCart._id
        return res.json({cart: savedCart})

    } else {
        const updatedCart = await Cart.findOneAndUpdate(
            {user: user},
            {"$push": {
                products: {
                    productId: req.body.product,
                    quantity: req.body.quantity || 1
                }
            }}
        );
        req.session.cart = updatedCart._id
        return res.json({cart: updatedCart})
    }
   } else {
    console.log('s')
    const cartExists = await Cart.findOne({session: ssid});
    if(!cartExists){
        const savedCart = await new Cart({
            session: ssid,
            products: [
                {productId: req.body.product, quantity: req.body.quantity || 1}
            ],
        }).save()
        req.session.cart = savedCart._id
        return res.json({cart: savedCart})
    } else {
        const updatedCart = await Cart.findOneAndUpdate(
            {session: ssid},
            {"$push": {
                products: {
                    productId: req.body.product,
                    quantity: req.body.quantity || 1
                }
            }}
        );
        req.session.cart = updatedCart._id
        return res.json({cart: updatedCart})
    }
   }

   
   return res.send({data: user});

} 

export const removeFromCart = async (req, res) => {
    res.send(JSON.stringify(req.session))
 }