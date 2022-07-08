import Product from '../models/Product.js'
import Comment from '../models/Comment.js'
import Category from "../models/Category.js";
import Feature from "../models/Feature.js";
import Slide from "../models/Slide.js";
import Cart from "../models/Cart.js";

import misc from "../config/misc.js";
import mongoose from 'mongoose';


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
 
 