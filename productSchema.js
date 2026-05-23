import mongoose from "mongoose";

const {Schema, model} = mongoose;


const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Product name must'],
        maxlength: [100, 'Product name must be less than 100 letters']
    },
    slug: {
        type: String,
        lowercase: true,
    },

    price: {
        type: Number,
        required: [true, 'product must be write'],
        min: [1, 'product price must be 1 or greater than 1']
    },
    disconnectPrice: {
        type: Number, 
        validate: {
            validator: function (val) {
                return val < this.price;

            }
        }
    },

    description: {
        type: String,
        required: [true, 'product description must be'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'please give actual category'],
        enum: ['electronics', 'clothing', 'books'] // this values are allowed

    },

    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,

    },
    image: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: [String],
            required: true
        }
    },
    review: {
        type: String,
    },
    averageRatings:{
        type: Number,
       // average: 0.0,
        default : 1,
        min: [1, 'min ratings 1'],
        max: [5, 'max rating 5']
    },
    stock: {
        type: Number,
        required: [true, 'stock must be write'],
        default: 0,

    },
    isFeatured: {
        type: Boolean,
        default: false
    }
});
productSchema.index({price: 1, category: 1});
productSchema.index({slug: 1});


productSchema.pre('save', function(next){

    if(this.isModified('name')){
       return this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]+\g/, '-').replace(/(^-| $-)\g/, '');
    }
    next();
    
});


const Product = model('Product', productSchema);
export default Product;
