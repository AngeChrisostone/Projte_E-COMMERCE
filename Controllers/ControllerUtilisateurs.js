import { body, validationResult } from 'express-validator';
import Relations from '../models/Relations.js';
const { Utilisateurs } = Relations;
const { Panier } = Relations;
const { Commandes} = Relations;
const { Role } = Relations;

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await Utilisateurs.findAll({ include: ['paniers', 'commandes', 'role'] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};

// Fonction pour récupérer un utilisateur spécifique par son ID
export const getUserById = async (req, res) => {
    try {
        const user = await Utilisateurs.findByPk(req.params.id, { include: ['paniers', 'commandes', 'role'] });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

// Fonction pour créer un nouvel utilisateur avec validation
export const createUser =
    // Ajouter des validateurs
    // body('Nom').notEmpty().withMessage('Le nom est requis'),
    // body('Prenom').notEmpty().withMessage('Le prénom est requis'),
    // body('Email').isEmail().withMessage('L\'email doit être valide'),
    // body('MotDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    // body('IdRole').isInt().withMessage('ID rôle doit être un entier'),

    // Middleware pour gérer les erreurs de validation
    // (req, res, next) => {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }

    // },

    // Le contrôleur réel
    async (req, res) => {
        try {
            const newUser = await Utilisateurs.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
        }
    }
;

// Fonction pour mettre à jour un utilisateur par son ID avec validation
export const updateUser = [
    // Ajouter des validateurs
    body('Nom').optional().notEmpty().withMessage('Le nom est requis'),
    body('Prenom').optional().notEmpty().withMessage('Le prénom est requis'),
    body('Email').optional().isEmail().withMessage('L\'email doit être valide'),
    body('MotDePasse').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('IdRole').optional().isInt().withMessage('ID rôle doit être un entier'),

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
            const [updated] = await Utilisateurs.update(req.body, { where: { IdUtilisateur: req.params.id } });
            if (updated) {
                const updatedUser = await Utilisateurs.findByPk(req.params.id);
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
    }
];

// Fonction pour supprimer un utilisateur par son ID
export const deleteUser = async (req, res) => {
    try {
        const deleted = await Utilisateurs.destroy({ where: { IdUtilisateur: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};

// Fonction pour récupérer les commandes d'un utilisateur par son ID
export const getUserOrders = async (req, res) => {
    try {
        const user = await Utilisateurs.findByPk(req.params.id, { include: ['commandes'] });
        if (user) {
            res.status(200).json(user.commandes);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes de l\'utilisateur' });
    }
};