import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 128,
        required: true,
        qnique: true,
    },
    description: {
        type: String,
        min: 64,
        max: 4096,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    sale: {
        type: Number,
        min: 0,
        max: 99,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
    running_out: {
        type: Boolean,
        default: false,
    },
    new: {
        type: Boolean,
        default: true,
    },
    customers_choice: {
        type: Boolean,
        default: false,
    },
    showInIndexSlider: {
        type: Boolean,
        default: false,
    },
    showInIndexCatalog: {
        type: Boolean,
        default: false,
    },
    images: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
})

const Product = mongoose.model('Product', ProductSchema)

export default Product;