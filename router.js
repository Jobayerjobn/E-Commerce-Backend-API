//router.js

import express from 'express';
import { signUp, login, createProduct, addToCart, getCart, checkoutAndOrder, getFilteredProducts } from './controller.js';

const router = express.Router();


router.post('/signup', signUp);
router.post('/login', login);
router.get('/user', createProduct);
router.post('/users/find', addToCart);
router.get('/cart', getCart);
router.post('/wow', checkoutAndOrder);
router.get('/filter', getFilteredProducts);

export default router;
