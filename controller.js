//controller.js

import AppError from "./customErrorHandler.js";
import User from "./userSchemaModel.js";
import { responseHelper } from "./middleware.js";
import Product from "./productSchema.js";
import Cart from "./cartModel.js";
import { application } from "express";
import Order from "./orderSchema.js";


export const globalErrorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message
    });

};


export const signUp = async (req, res, next) => {
    try{
        const{name, email, password} = req.body;
        if(!name || !email || !password){
            return next(new AppError('Please fill up all the input fields', 400));
        };

        const newUser = await User.create({name, email, password});
        const token = newUser.createJWT(); //create token
        
        newUser.password = undefined;
        responseHelper(res, 200, 'User Register Successfully', {token, newUser});


    }catch(err){
        if(err.code === 11000) return next(new AppError('This email already registered', 400));
        next(new AppError(err.message, 500));
    };

};


export const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return next(new AppError('please give Email and Password', 400));

        };
        const user = await User.findOne({email}).select('+password');
        if(!user || !(await user.correctPassword(password, user.password))){
            return next(new AppError('Please give correct password', 401));
        };

        const token = user.createJWT();
        user.password = undefined;

        responseHelper(res, 200, 'Login successfully', {token});


    }catch(err){
        next(new AppError(err.message, 500));
    };
};


export const createProduct = async (req, res, next) => {
    try{
        const{name, description, price, discountPrice, image, category, brand, stock, review, isFeatured} = req.body;
        //const slug = name.tolowerCase().replace(/[^a-zA-Z0-9]+\g/, '-').replace(/(^-| $-)\g/, '');
        const newProduct = await Product.create({
            name,
            description,
            price,
            discountPrice,
            image,
            category,
            brand,
            stock,
            review,
            isFeatured

        });

        responseHelper(res, 200, 'Product create successfully', newProduct);

    }catch(err){
        next(new AppError(err.message, 500));

    }
};

export const addToCart = async (req, res, next) => {

    try{
        let {productId, quantity} = req.body;

        const userId = req.user_id; 
        quantity = Number(quantity);

        if(!quantity || quantity <= 0){
            return next(new AppError('Please give positive quantity', 400));
            
        };
        const product = await Product.findById(productId);
        if(!product){
            return next(new AppError('Product not found', 404));

        };
        
        let cart = await Cart.findOne({user: userId});
        await Cart.deleteMany({});
        if(!cart){
            cart = new Cart({
                user: userId,
                items: [],
            });

        };
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if(itemIndex > - 1 ){
            cart.items[itemIndex].quantity  += quantity;
            cart.items[itemIndex].price = product.price;

        }else{
            cart.items.push({product: productId, quantity, price: product.price});

        };
        cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await cart.save();

        await cart.populate('items.product', 'name category brand');
        responseHelper(res, 200, 'Add to Cart successfully', cart);


    }catch(err){
        next(new AppError(err.message, 500));

    };

};

export const getCart = async (req, res, next) => {
    try{
        const cart = await Cart.findOne({user: req.user_id}).populate('items.product', 'name category brand');
        if(!cart) return responseHelper(res, 200, 'Your Cart is empty', {items: [], totalPrice: 0});

        responseHelper(res, 200, 'Cart fetch successfully', cart);


    }catch(err){
        next(new AppError(err.message, 500));
    };
};

export const checkoutAndOrder = async (req, res, next) => {
    try{
        const {shippingAddress, paymentMethod} = req.body;
        const userId = req.user_id;

        const orderReview = await Cart.findOne({user: userId}).populate('items.product', 'name, image');
        if(!orderReview || orderReview.items.length === 0) {
            return next(new AppError('Your cart is empty.please place order', 400));
        }
        
        const shippingPrice = shippingAddress.city.toLowerCase() === 'dhaka' ? 60 : 120;
        const totalPrice = orderReview.totalPrice + shippingPrice;

        const newOrder = await Order.create({
            user: userId,
            orderItems: orderReview.items,
            shippingAddress,
            paymentMethod,
            itemPrice: orderReview.totalPrice, 
            shippingPrice,
            totalPrice,
            orderStatus: 'Processing',
            isPaid: paymentMethod === 'Online' ? true : false,
        })

        await Cart.findOneAndDelete({user: userId});

        responseHelper(res, 200, 'Order placed successfully', newOrder);
    }catch(err){
        next(new AppError(err.message, 500));

    };
};

export const getFilteredProducts = async (req, res, next) => {
    try{
        const queryObj = {
            ...req.query
        };

        const excludedQuery = ['limit', 'page', 'sort'];

        excludedQuery.forEach(field => {
            delete queryObj[field];

        });

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        const products = await Product.find(JSON.parse(queryStr));
        responseHelper(res, 200, 'filter successfully', {product: products, result: products.length});

    }catch(err){
        next(new AppError(err.message, 500));

    }
}