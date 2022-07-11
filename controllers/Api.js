import Product from '../models/Product.js'
import Comment from '../models/Comment.js'
import Category from "../models/Category.js";
import Feature from "../models/Feature.js";
import Slide from "../models/Slide.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

import misc from "../config/misc.js";
import mongoose from 'mongoose';

import {orderValidation} from '../validations/SchemaValidation.js'

export const getCart = async (req, res) => {
    if(!req.sessionID) {
        return res.status(400).json({err: 'Session required'});
    }
    try {
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            }).then((cart) => {
                return res.json({cart: cart})
            });
        }
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).json(data);
    }
}

export const addToCart = async (req, res) => {

    if(!req.session) return res.status(400).send({message: 'Session required'});
    const ssid = req.sessionID;
    const ObjectIdRegexp =  /^[a-fA-F0-9]{24}$/,
          quantityRegexp = /^[0-9]{1,3}$/;
     
     if(!String(req.body.quantity).match(quantityRegexp)) {
        return res.status(400).json({error: 'Wrong product quantity value'});
     }
     if(!req.body.product.match(ObjectIdRegexp)) {
         return res.status(400).json({error: 'This product does not exist'});
     }
    try {
         const cartExists = await Cart.findOne({session: ssid})
         const product = await Product.findOne({_id: req.body.product});
        
         let productPromotion = product.price;
         if(product.sale > 0){
            productPromotion = Math.floor((product.price / 100 * (100 - product.sale)))
         }
         if(!cartExists){
             const savedCart = await new Cart({
                 session: ssid,
                 products: [
                     {productId: req.body.product, quantity: req.body.quantity || 1}
                 ],
                 total: product.price * parseInt(req.body.quantity),
                 totalPromotion: productPromotion * parseInt(req.body.quantity),
             }).save()
             savedCart.populate('products.productId').then((data) => {
                console.log(data);
                req.session.cart = savedCart._id
                return res.json({cart: data})
             })
             
         } else {
             const inCart = await Cart.findOne({
                 "products.productId": {"$eq": req.body.product}
             });
             
             if(inCart) {
                 
                 const updatedCart = await Cart.findOneAndUpdate(
                     { _id: inCart.id, "products.productId": req.body.product },
                     {
                         "$inc": {
                             "products.$.quantity": req.body.quantity,
                             total: product.price * parseInt(req.body.quantity),
                             totalPromotion: productPromotion * parseInt(req.body.quantity),
                         },
                     },
                     {new: true}
                 ).populate({path:'products.productId' })
                  .exec((err, data) => {
                     req.session.cart = data._id
                     return res.json({cart: data})
                 })
 
                 
             } else {
                 const updatedCart = await Cart.findOneAndUpdate(
                     {session: ssid},
                     {
                         "$push": {
                             products: {
                                 productId: req.body.product,
                                 quantity: req.body.quantity || 1
                             }
                         },
                         "$inc": {
                            total: product.price * parseInt(req.body.quantity),
                            totalPromotion: productPromotion * parseInt(req.body.quantity),
                        }
                     },
                     {new: true}
                 ).populate({path:'products.productId' })
                  .exec((err, data) => {
                    req.session.cart = data._id
                    return res.json({cart: data})
                })
             }            
         }
    } catch (err) {
         throw new Error(err)
    }
} 
 
export const removeFromCart = async (req, res) => {
     if(!req.session) {
         return res.status(400).json({error: 'Session required'});
     }
 
     const ssid = req.sessionID;
     const ObjectIdRegexp =  /^[a-fA-F0-9]{24}$/;
    
     if(!req.body.product.match(ObjectIdRegexp)) {
        return res.status(400).json({error: 'This product does not exist'});
     }
 
     const product = await Product.findOne({_id: req.body.product});
        
     if(!product) res.status(400).json({error: 'This product does not exist'})
     let quantity;
     let productPromotion = product.price;

     if(product.sale > 0){
        productPromotion = Math.floor((product.price / 100 * (100 - product.sale)))
     }

     const cartItems = await Cart.findOne({
         "products.productId": {"$eq": req.body.product},
         session: ssid
     }, 'products').then((data) => {
         data.products.forEach((item) => {
             if(item.productId = req.body.product) {
                 quantity = item.quantity;
                 return;
             };
         })
     })
     // if(!cartItems) return res.status(400).json({message: 'Такого товара нет в корзине находиться в корзине'});
     
     
     const updatedCart = await Cart.findOneAndUpdate(
         {session: ssid},
         {
             "$pull": {
                 "products": {productId: req.body.product}
             },
             "$inc": {
                total: -product.price * quantity,
                totalPromotion: -productPromotion * quantity,
            }
         },
         {new: true}
     ).populate({path:'products.productId' })
     .exec((err, data) => {
        console.log(data)
       req.session.cart = data._id
       return res.json({cart: data})
   })

};

export const getDeleteCategoryView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'category-delete',
        misc: misc,
        user: req.user,
    };
    try {
        const categories = await Category.find().populate({
            path: 'parentId.category'
        });
        if(categories) {
            page.categories = categories
        }
    } catch (err) {
        const data = {
            message: err
        }
        return res.status(400).render('admin/status-pages/400', {data: data});
    }
    res.render('admin/route-pages/category-delete.pug', {data: page})
}
export const deleteCategory = async (req, res) => {
    if(!req.body.category) throw new Error('Нужно указать категорию');

    try {
      
        const category = await Category.findOneAndDelete(
            {_id: req.body.category},
            {new: true}
        );
        const products = await Product.find({category: category._id}).populate('category');
        await Cart.deleteMany({}); // Delete this


        const productsIDs = []
        products.forEach((product) => {
            productsIDs.push(product._id)
            
        })

        await Comment.deleteMany(
            { "product": {$in: productsIDs} },
        ).populate('product');

        await Order.deleteMany({
            "products.productId": {$in: productsIDs}
        }).populate({path: 'products.productId'});

        await Product.deleteMany(
            { "_id": {$in: productsIDs} },
        );
        
        return res.json({data: 'success'})
    } catch (err) {
        return res.json({data: err})
    }

    return res.json({data: 'End'})
}
export const createOrder = async(req, res) => {
    const cart = await Cart.findOneAndDelete({session: req.sessionID}, {new: true}).populate({path:'products.productId' });
    if(!cart) return res.status(400).send('Нет товаров в корзине')
    if(!req.sessionID) return res.status(400).send('Session required');
    
    const orderValidationData = {
    
        session: req.sessionID,
        name: req.body?.name,
        email: req.body?.email,
        phone: req.body?.phone,
        address: req.body?.address,
        status: 'pending',
    }
    const {error} = orderValidation(orderValidationData);
    if(error){
        return res.status(400).send(error.details[0].message)
    }; 
    try {
       const createdOrder =  await new Order({
            session: req.sessionID,
            name: req.body?.name,
            email: req.body?.email,
            phone: req.body?.phone,
            address: req.body?.address,
            description: req.body?.description,
            status: 'pending',
            total: cart.total,
            totalPromotion: cart.totalPromotion,
            products: cart.products,

       }).save()

       return res.redirect('/store/category')
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).send(err)
    }
}

export const getOrdersPageView = async(req, res) => {
    if(!req.sessionID) return res.status(400).send('Session required')


    const render = {
        lang: 'uk-UK',
        description: 'Система керування контентом Ейфорія від одноіменної веб-студії, створена з допомогою NodeJs',
        robots: 'index',
        keywords: 'CMS, Ейфорія, Система керуваня контентом, NodeJs CMS',
        title: 'UArmor | Система керування контентом',
        author: 'Euphoria digital agency',
        name: 'cart',
        misc: misc,
        user: req.user,
        
    };
    try {
        const {page = 1, limit = 50} = req.query;
        // if(req.query.page) page = req.query.page;
        const orders = await Order.find().populate({
                path: 'products.productId'
            }).skip((page - 1) * limit).limit(limit * 1).sort('-createdAt');
            render.orders = orders
            const count = await Order.count({});
            const paginationItems = Math.ceil(count / limit)
            render.paginationItems = paginationItems;
            render.pageNum = parseInt(page)
            res.render('admin/route-pages/orders', {data: render})
            
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).send(err)
    }
    
}

export const getSlidesPagesView = async(req, res) => {
    const render = {
        lang: 'uk-UK',
        description: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        title: 'UArmor - надійний магазин військової амуніції та спецспорядження',
        robots: 'index',
        name: 'comments',
        misc: misc,
    };
        try {
            const slides = await Slide.find()
            if(slides){
                render.slides = slides
            }
            res.render('admin/route-pages/slides', {data: render})
        } catch (err) {
            const data = {
                message: err
            }
        return res.status(400).render('admin/status-pages/400', {data: data});
    }
}

export const deleteSlide = async(req, res) => {
    const id = req.params.id

    await Slide.findOneAndDelete({id: id});
    res.redirect('/admin/slides/all')
}