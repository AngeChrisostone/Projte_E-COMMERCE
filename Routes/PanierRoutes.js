import express from 'express';
import { createCart, getUserCart, addItemToCart, removeItemFromCart } from '../controllers/ControllerPanier.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:IdUtilisateur', getUserCart);
router.post('/', addItemToCart);
router.delete('/', removeItemFromCart); 

export default router;
