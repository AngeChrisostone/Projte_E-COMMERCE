import express from 'express';
import { getAllCoupons, getCouponById, createCoupon, updateCoupon, deleteCoupon } from '../controllers/ControllerCoupon.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllCoupons);
router.get('/:id', getCouponById);

router.post(
    '/',
    [
        body('code').notEmpty().withMessage('Le code est requis'),
        body('description').notEmpty().withMessage('La description est requise'),
        body('dateExpiration').isISO8601().withMessage('La date d\'expiration doit être au format ISO 8601')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createCoupon
);

router.put(
    '/:id',
    [
        body('code').optional().notEmpty().withMessage('Le code est requis'),
        body('description').optional().notEmpty().withMessage('La description est requise'),
        body('dateExpiration').optional().isISO8601().withMessage('La date d\'expiration doit être au format ISO 8601')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateCoupon
);

router.delete('/:id', deleteCoupon);

export default router;
