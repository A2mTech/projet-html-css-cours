import express from 'express';
import { addToCart, getCartCount, getCartItems } from '../controllers/cartController';

const router = express.Router();

router.post('/cart/add', addToCart);
router.get('/cart/count', getCartCount);
router.get('/cart/items', getCartItems);

export default router; 