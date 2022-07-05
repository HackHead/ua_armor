import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        max: 128
    },
    link: {
        type: String
    }
})

const Slide = mongoose.model('Slide', SlideSchema)

export default Slide;