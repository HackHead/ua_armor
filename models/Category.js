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
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
}, {timestamps: true})

const Category = mongoose.model('Category', CategorySchema)

export default Category;