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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' 
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
    show_in_index_slider: {
        type: Boolean,
        default: false,
    },
    show_in_index_catalog: {
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
    slug: {
        type: String,
        required: true,
        unique: true,
    }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product;