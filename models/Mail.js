import mongoose from "mongoose";

const MailSchema = new mongoose.Schema({
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
    seen: {
        type: Boolean,
        default: false
    }
})

const Mail = mongoose.model('Mail', MailSchema)

export default Mail;