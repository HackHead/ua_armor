import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 64
    },
    image: {
        type: String,
        required: true,
    },
    button: {
        type: String,
        required: true,
        max: 16
    },
    link: {
        type: String
    },
    description: {
        type: String,
        max: 128,
    }
})

const Slide = mongoose.model('Slide', SlideSchema)

export default Slide;