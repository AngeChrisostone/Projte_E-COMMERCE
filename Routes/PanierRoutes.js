import express from 'express';
import { getUserCart, addItemToCart, removeItemFromCart } from '../controllers/ControllerPanier.js';

const router = express.Router();

router.get('/:userId', getUserCart);
router.post('/', addItemToCart);
router.delete('/', removeItemFromCart);

export default router;
