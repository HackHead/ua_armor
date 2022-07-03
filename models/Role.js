import mongoose from "mongoose"

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        default: 'Пользователь'  
    },
    role: {
        type: String,
        default: 'user'
    },
    isStaff: {
        default: false,
        type: Boolean,
    }
})

const model = mongoose.model('Role', RoleSchema);
export default model;