import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserOrders } from '../controllers/ControllerUtilisateurs.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);

router.post(
    '/',
    [
        body('Nom').notEmpty().withMessage('Le nom est requis'),
        body('Prenom').notEmpty().withMessage('Le prénom est requis'),
        body('Email').isEmail().withMessage('L\'email est invalide'),
        body('MotDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('IdRole').isInt().withMessage('L\'ID du rôle doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createUser
);


router.put(
    '/:id',
    [
        body('Nom').optional().notEmpty().withMessage('Le nom est requis'),
        body('Prenom').optional().notEmpty().withMessage('Le prénom est requis'),
        body('Email').optional().isEmail().withMessage('L\'email est invalide'),
        body('MotDePasse').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('IdRole').optional().isInt().withMessage('L\'ID du rôle doit être un entier')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateUser
);

router.delete('/:id', deleteUser);
router.get('/:id/commandes', getUserOrders);

export default router;
