import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        min: 6,
        max: 320,
        required: true,
        qnique: true,
    },
    name: {
        type: String,
        min: 2,
        max: 64,
        required: true,
    },
    password: {
        type: String,
        min: 6,
        max: 64,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'user'
    },
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

export default User;