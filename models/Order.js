import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        max: 4096,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        default: 0
    },
    totalPromotion: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
}, {timestamps: true})
OrderSchema.index({createdAt: 1},{expireAfterSeconds: 3600 * 24});
const Order = mongoose.model('Order', OrderSchema)

export default Order;