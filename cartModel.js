import mongoose from "mongoose";
const {Schema, model} = mongoose;

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'product must have an id'],
    },
    quantity:{
        type: Number,
        required: [true, 'Product quantity must be'],
        default: 1,
        min: [1, 'quantity never less than 1']
    },
    price: {
        type: Number,
        required: [true, 'Price must be'],
    }
}, {_id: false});


const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //relation actual user
       // required: [true, 'cart must belong to a user'],
        //unique: true,
        //default: null,
    },

    items: [cartItemSchema],

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    totalItems: {
        type: Number,
        required: true,
        default: 1
    }

}, {timestamps: true});


const Cart = model('Cart', cartSchema);
export default Cart;
