import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    key: {
        type: String,
        max: 64,
        required: true,
    },
    value: {
        type: String,
        max: 128
    }
})

const Feature = mongoose.model('Feature', FeatureSchema)

export default Feature;