import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/ControllerCommandes.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);

router.post(
    '/',
    [
        body('DateCom').isISO8601().withMessage('La date doit être au format ISO 8601'),
        body('StatusCom').notEmpty().withMessage('Le statut est requis'),
        body('IdUtilisateur').optional().isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
        body('IdCoupon').optional().isInt().withMessage('L\'ID du coupon doit être un entier'),
        body('IdModeDePaiement').isInt().withMessage('L\'ID du mode de paiement doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createOrder
);

router.put(
    '/:id',
    [
        body('DateCom').optional().isISO8601().withMessage('La date doit être au format ISO 8601'),
        body('StatusCom').optional().notEmpty().withMessage('Le statut est requis'),
        body('IdUtilisateur').optional().isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
        body('IdCoupon').optional().isInt().withMessage('L\'ID du coupon doit être un entier'),
        body('IdModeDePaiement').optional().isInt().withMessage('L\'ID du mode de paiement doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateOrder
);

router.delete('/:id', deleteOrder);

export default router;
