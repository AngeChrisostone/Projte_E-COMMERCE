import express from 'express';
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/ControllerAvis.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);

router.post(
    '/',
    [
        body('Note').isInt({ min: 1, max: 5 }).withMessage('La note doit être un entier entre 1 et 5'),
        body('Commentaire').notEmpty().withMessage('Le commentaire est requis'),
        body('DateAvis').isISO8601().withMessage('La date doit être au format ISO 8601'),
        body('IdProduit').isInt().withMessage('L\'ID du produit doit être un entier'),
        body('IdUtilisateur').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createReview
);

router.put(
    '/:id',
    [
        body('Note').optional().isInt({ min: 1, max: 5 }).withMessage('La note doit être un entier entre 1 et 5'),
        body('Commentaire').optional().notEmpty().withMessage('Le commentaire est requis'),
        body('DateAvis').optional().isISO8601().withMessage('La date doit être au format ISO 8601'),
        body('IdProduit').optional().isInt().withMessage('L\'ID du produit doit être un entier'),
        body('IdUtilisateur').optional().isInt().withMessage('L\'ID de l\'utilisateur doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateReview
);

router.delete('/:id', deleteReview);

export default router;
