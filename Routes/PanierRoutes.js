import express from 'express';
import { getUserCart, addItemToCart, removeItemFromCart } from '../controllers/ControllerPanier.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/:userId', getUserCart);

router.post(
    '/',
    [
        body('userId').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
        body('produitId').isInt().withMessage('L\'ID du produit doit être un entier'),
        body('quantite').isInt().withMessage('La quantité doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    addItemToCart
);

router.delete(
    '/',
    [
        body('userId').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
        body('produitId').isInt().withMessage('L\'ID du produit doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    removeItemFromCart
);

export default router;
