import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 128,
        required: true,
        qnique: true,
    },
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

export default User;