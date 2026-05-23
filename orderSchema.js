import mongoose, { mongo } from "mongoose";
const {Schema, model} = mongoose;

const orderItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'must be an product id']
    },

    quantity: {
        type: Number,
        required: true,
        min: [1, 'must be quantity 1']
    }, 
    price:{
        type: Number,
        required: true,

    }

}, {_id: false});

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // custom use add;
        //required: [true, 'must be actual user'],
        
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        name: {type: String, required: [true, 'must be write name']},
        phone: {type: String, required: [true, 'must assign phone number']},
        address: {type: String, required: [true, 'address must be']},
        city: {type: String, required: [true, 'must be city name']},
        postalCode: {type: String, required: [true, 'must be postalCode']},

    },
    paymentMethod: {
        type: String,
        required: [true, 'must be select payment method'],
        enum: ['COD', 'bKash', 'Nagad', 'Card']

    },
    paymentResult: {
        type: {
            type: String
        },
        status: {type: String, default: 'pending'}
    },
    itemPrice: {
        type: Number,
        required: [true, 'must be item price'],
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 60.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,

    },
    paidAt:{
        type: Date
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing',
        enum:['Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    deliveredAt:{
        type: Date
    }

},{timestamps: true});


const Order = model('Order', orderSchema);
export default Order;
