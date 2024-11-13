import express from 'express';
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/ControllerRole.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getAllRoles);
router.get('/:id', getRoleById);

router.post(
    '/',
    [
        body('NomRole').notEmpty().withMessage('Le nom du rôle est requis')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createRole
);

router.put(
    '/:id',
    [
        body('NomRole').optional().notEmpty().withMessage('Le nom du rôle est requis')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateRole
);

router.delete('/:id', deleteRole);

export default router;
