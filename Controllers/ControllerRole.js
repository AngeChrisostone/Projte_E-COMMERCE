import { body, validationResult } from 'express-validator';
import Relations from '../models/Relations.js';
const {Role } = Relations;

// Fonction pour récupérer tous les rôles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({ include: ['utilisateurs'] });
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
    }
};

// Fonction pour récupérer un rôle par son ID
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id, { include: ['utilisateurs'] });
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ error: 'Rôle non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du rôle' });
    }
};

// Fonction pour créer un nouveau rôle avec validation
export const createRole = [
    // Ajouter des validateurs
    body('NomRole').notEmpty().withMessage('Le nom du rôle est requis'),

    // Middleware pour gérer les erreurs de validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // Le contrôleur réel
    async (req, res) => {
        try {
            const newRole = await Role.create(req.body);
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création du rôle' });
        }
    }
];

// Fonction pour mettre à jour un rôle par son ID avec validation
export const updateRole = [
    // Ajouter des validateurs
    body('NomRole').optional().notEmpty().withMessage('Le nom du rôle est requis'),

    // Middleware pour gérer les erreurs de validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // Le contrôleur réel
    async (req, res) => {
        try {
            const [updated] = await Role.update(req.body, { where: { IdRole: req.params.id } });
            if (updated) {
                const updatedRole = await Role.findByPk(req.params.id);
                res.status(200).json(updatedRole);
            } else {
                res.status(404).json({ error: 'Rôle non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle' });
        }
    }
];

// Fonction pour supprimer un rôle par son ID
export const deleteRole = async (req, res) => {
    try {
        const deleted = await Role.destroy({ where: { IdRole: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Rôle non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
    }
};