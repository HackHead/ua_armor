import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 128,
        required: true,
        unique: true,
        trim: true, 
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    productsCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Category = mongoose.model('Category', CategorySchema)

export default Category;