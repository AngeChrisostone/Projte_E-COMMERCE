import express from 'express';
import { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress } from '../controllers/ControllerAdresse.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllAddresses);
router.get('/:id', getAddressById);

router.post(
    '/',
    [
        body('AdresseLigne').notEmpty().withMessage('L\'adresse est requise'),
        body('Ville').notEmpty().withMessage('La ville est requise'),
        body('Province').notEmpty().withMessage('La province est requise'),
        body('CodePostal').notEmpty().withMessage('Le code postal est requis'),
        body('Pays').notEmpty().withMessage('Le pays est requis'),
        body('IdUtilisateur').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createAddress
);

router.put(
    '/:id',
    [
        body('AdresseLigne').optional().notEmpty().withMessage('L\'adresse est requise'),
        body('Ville').optional().notEmpty().withMessage('La ville est requise'),
        body('Province').optional().notEmpty().withMessage('La province est requise'),
        body('CodePostal').optional().notEmpty().withMessage('Le code postal est requis'),
        body('Pays').optional().notEmpty().withMessage('Le pays est requis'),
        body('IdUtilisateur').optional().isInt().withMessage('L\'ID de l\'utilisateur doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateAddress
);

router.delete('/:id', deleteAddress);

export default router;
