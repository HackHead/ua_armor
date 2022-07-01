import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 64,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 320
    },
    message: {
        type: String,
        required: true,
        max: 4096,
        min: 8,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rate: {
        type: String,
        default: '5',
    },
    productId: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment;