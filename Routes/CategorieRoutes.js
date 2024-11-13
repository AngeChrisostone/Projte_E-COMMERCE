import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/ControllerCategorie.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

router.post(
    '/',
    [
        body('Nom').notEmpty().withMessage('Le nom est requis'),
        body('Description').notEmpty().withMessage('La description est requise')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createCategory
);

router.put(
    '/:id',
    [
        body('Nom').optional().notEmpty().withMessage('Le nom est requis'),
        body('Description').optional().notEmpty().withMessage('La description est requise')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateCategory
);

router.delete('/:id', deleteCategory);

export default router;
