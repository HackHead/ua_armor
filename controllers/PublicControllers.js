 
// Importing models
import Product from '../models/Product.js'
import Comment from '../models/Comment.js'
import Category from "../models/Category.js";
import Feature from "../models/Feature.js";
import Slide from "../models/Slide.js";
import Cart from "../models/Cart.js";

import misc from "../config/misc.js";


export const getCartPageView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        title: 'Військова амуніція в Україні, UArmor військторг',
        description: 'Військова амуніція від uarmor.net.ua, великий асортимент військового і туристичного спорядження в Києві, Харкові, Одесі, Дніпрі, Львові та по всій Україні',
        name: 'cart',
        misc: misc,
        
    };
    try {
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            });
            page.cart = cart || null
        }
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).send(err)
    }
    res.render('generall/route-pages/cart', {data: page})
}

export const getOrderPageView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        title: 'Військова амуніція в Україні, UArmor військторг',
        description: 'Військова амуніція від uarmor.net.ua, великий асортимент військового і туристичного спорядження в Києві, Харкові, Одесі, Дніпрі, Львові та по всій Україні',
        name: 'cart',
        misc: misc,
        
    };
    try {
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            });
            page.cart = cart || null
        }
    } catch (err) {
        const data = {
            message: err
        };
        res.status(400).send(err)
    }
    res.render('generall/route-pages/order', {data: page})
}

export const getIndexPageView = async (req, res) => {
    const page = {
        lang: 'uk-UK',
        title: 'Військова амуніція в Україні, UArmor військторг',
        description: 'Військова амуніція від uarmor.net.ua, великий асортимент військового і туристичного спорядження в Києві, Харкові, Одесі, Дніпрі, Львові та по всій Україні',
        name: 'home',
        misc: misc,
        
    };
    try {
        const slides = await Slide.find();
        if(slides) page.slides = slides;

        const catalog_products = await Product.find({show_in_index_catalog: true}).populate('category');
        if(catalog_products) page.catalog_products = catalog_products;

        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            });
            page.cart = cart || null;
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
        title: 'Військова амуніція в Україні, UArmor військторг',
        description: 'Військова амуніція від uarmor.net.ua, великий асортимент військового і туристичного спорядження в Києві, Харкові, Одесі, Дніпрі, Львові та по всій Україні',
        name: 'about',
        misc: misc,
        
    };
    try {
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            });
            page.cart = cart || null
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
        title: 'Військовий магазин одягу, спорядження - UArmor',
        description: 'Надійний виробник військового одягу, амуніції, туристичних товарів і засобів захисту за доступними цінами В одесі та Україні',
        name: 'contacts',
        misc: misc,
        
    };
    try {
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            });
            page.cart = cart || null
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
        title: 'Військова амуніція в Україні, UArmor військторг',
        description: 'Військова амуніція від uarmor.net.ua, великий асортимент військового і туристичного спорядження в Києві, Харкові, Одесі, Дніпрі, Львові та по всій Україні',
        name: 'store',
        misc: misc,
        
    };
    try {
        const minPrice = await Product.findOne().limit(1).sort('price') || 0;
        const maxPrice = await Product.findOne().limit(1).sort('-price') || 0;

        const {sort = '-date', limit = 6, skip = 1, availability = null, search, min = minPrice.price, max = maxPrice.price} = req.query;
        const slug = req.params.slug || /.*/;

        const products = await Product.find({
            availability: (req.query.availability) ? req.query.availability: /.*/,
            price: {
                $gte: min,
                $lte: max,
            },
            name: (search) ? { $regex: '.*' + search + '.*' } : { $regex: '.*' }
        }).populate('category', 'slug', {slug: slug}).skip((skip - 1) * limit).limit(limit * 1).sort(req.query.sort);;
        

        const pageQuery = {
            sort: sort,
            limit: limit,
            skip: skip,
            availability: availability,
            min: min,
            max: max,
            category: String(slug)
        }
        page.query = pageQuery
        console.log(pageQuery)

        const count = await Product.find({
            availability: (req.query.availability) ? req.query.availability: /.*/,
            price: {
                $gte: min,
                $lte: max,
            }
        }).count();
        const paginationItems = Math.ceil(count / limit)
        page.paginationItems = paginationItems;
        page.pageNum = parseInt(skip)
        page.count = count;
        if(products) page.products = products;

        const categories = await Category.find()
        if(categories) page.categories = categories;
        
        if(req.session.cart){
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            });
            page.cart = cart || null
        }
    } catch (err) {
        res.status(400).render('generall/status-pages/400', {data: err})
    }

    res.render('generall/route-pages/shop', {data: page})
}

export const getProductPageView = async (req, res) => {
    
    const page = {
        lang: 'uk-UK',
        title: 'Військова амуніція в Україні, UArmor військторг',
        description: 'Військова амуніція від uarmor.net.ua, великий асортимент військового і туристичного спорядження в Києві, Харкові, Одесі, Дніпрі, Львові та по всій Україні',
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
            const cart = await Cart.findOne({session: req.sessionID}).populate({
                path: 'products.productId'
            });
            page.cart = cart || null
        }

        
        const features = await Feature.find({product: product._id});
        if(features) page.features = features;

        const relatedProducts = await Product.find({category: product.category._id}).populate('category').limit(6);
        if(relatedProducts) page.relatedProducts = relatedProducts;

        const allComments = await Comment.find({product: product._id});
        if(allComments) page.comments = allComments;

    } catch (err) {
        res.status(400).send(err)
    }
    
    res.render('generall/route-pages/single-product', {data: page})
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

        if(!cartExists){
            const savedCart = await new Cart({
                session: ssid,
                products: [
                    {productId: req.body.product, quantity: req.body.quantity || 1}
                ],
                total: product.price * parseInt(req.body.quantity),
            }).save().then((data) => {
                req.session.cart = data._id;
                return res.json({cart: data});
            });

            
            
    
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
                            total: product.price * parseInt(req.body.quantity)
                        },
                    },
                    {new: true}
                ).then((data) => {
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
                        "$inc": {total: product.price * parseInt(req.body.quantity)}
                    },
                    {new: true}
                ).then((data) => {
                    req.session.cart = data._id
                    return res.json({cart: data})
                });
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
            "$inc": {total: -product.price * quantity}
        },
    );

    req.session.cart = updatedCart._id
    return res.json({cart: updatedCart})
 };

