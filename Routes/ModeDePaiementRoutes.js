import express from 'express';
import { getAllPaymentMethods, getPaymentMethodById, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '../controllers/ControllerModeDePaiement.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllPaymentMethods);
router.get('/:id', getPaymentMethodById);

router.post(
    '/',
    [
        body('nom').notEmpty().withMessage('Le nom du mode de paiement est requis'),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createPaymentMethod
);

router.put(
    '/:id',
    [
        body('nom').optional().notEmpty().withMessage('Le nom du mode de paiement est requis'),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updatePaymentMethod
);

router.delete('/:id', deletePaymentMethod);

export default router;
