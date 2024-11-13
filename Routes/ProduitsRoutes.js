import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductReviews } from '../controllers/ControllerProduits.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post(
    '/',
    [
        body('NomProduit').notEmpty().withMessage('Le nom du produit est requis'),
        body('DescriptionProd').notEmpty().withMessage('La description est requise'),
        body('PrixProd').isFloat().withMessage('Le prix doit être un nombre decimal'),
        body('IdCategorie').isInt().withMessage('L\'ID de la catégorie doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createProduct
);

router.put(
    '/:id',
    [
        body('NomProduit').optional().notEmpty().withMessage('Le nom du produit est requis'),
        body('DescriptionProd').optional().notEmpty().withMessage('La description est requise'),
        body('PrixProd').optional().isFloat().withMessage('Le prix doit être un nombre decimal'),
        body('IdCategorie').optional().isInt().withMessage('L\'ID de la catégorie doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateProduct
);

router.delete('/:id', deleteProduct);
router.get('/:id/avis', getProductReviews);

export default router;
