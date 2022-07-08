import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true,
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
    }
}, {timestamps: true})
CartSchema.index({createdAt: 1},{expireAfterSeconds: 3600 * 24});
const Cart = mongoose.model('Cart', CartSchema)

export default Cart;