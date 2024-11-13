import express from 'express';
import { getAllOrderDetails, getOrderDetailById, createOrderDetail, updateOrderDetail, deleteOrderDetail } from '../controllers/ControllerDetailsCommande.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllOrderDetails);
router.get('/:id', getOrderDetailById);

router.post(
    '/',
    [
        body('IdCommande').isInt().withMessage('L\'ID de la commande doit être un entier'),
        body('produitId').isInt().withMessage('L\'ID du produit doit être un entier'),
        body('quantite').isInt().withMessage('La quantité doit être un entier'),
        body('prix').isFloat().withMessage('Le prix doit être un nombre décimal')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createOrderDetail
);

router.put(
    '/:id',
    [
        body('IdCommande').optional().isInt().withMessage('L\'ID de la commande doit être un entier'),
        body('produitId').optional().isInt().withMessage('L\'ID du produit doit être un entier'),
        body('quantite').optional().isInt().withMessage('La quantité doit être un entier'),
        body('prix').optional().isFloat().withMessage('Le prix doit être un nombre décimal')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateOrderDetail
);

router.delete('/:id', deleteOrderDetail);

export default router;
