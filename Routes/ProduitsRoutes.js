import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductReviews } from '../controllers/ControllerProduits.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id/avis', getProductReviews);

export default router;
