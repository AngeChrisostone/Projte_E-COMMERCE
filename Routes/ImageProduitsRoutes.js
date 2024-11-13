import express from 'express';
import { getAllImages, getImageById, createImage, updateImage, deleteImage } from '../controllers/ControllerImagesProduit.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllImages);
router.get('/:id', getImageById);

router.post(
    '/',
    [
        body('IdProduit').isInt().withMessage('L\'ID du produit doit être un entier'),
        body('url').isURL().withMessage('L\'URL de l\'image doit être valide'),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createImage
);

router.put(
    '/:id',
    [
        body('IdProduit').optional().isInt().withMessage('L\'ID du produit doit être un entier'),
        body('url').optional().isURL().withMessage('L\'URL de l\'image doit être valide'),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateImage
);

router.delete('/:id', deleteImage);

export default router;
