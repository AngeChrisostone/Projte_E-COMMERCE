import { body, validationResult } from 'express-validator';
import Commandes from '../models/Commandes.js';
import DetailsCommande from '../models/DetailsCommande.js';

// Fonction pour récupérer toutes les commandes
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Commandes.findAll({ include: ['detailsCommande', 'modePaiement', 'coupon'] });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
};

// Fonction pour récupérer une commande par son ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Commandes.findByPk(req.params.id, { include: ['detailsCommande', 'modePaiement', 'coupon'] });
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
};

// Fonction pour créer une nouvelle commande avec validation
export const createOrder = [
    // Ajouter des validateurs
    body('IdUtilisateur').isInt().withMessage('ID utilisateur doit être un entier'),
    body('DateCom').isISO8601().withMessage('La date de commande doit être une date valide'),
    // Ajoutez d'autres validations selon vos besoins

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
            const newOrder = await Commandes.create(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de la commande', details: error.message });
        }
    }
];

// Fonction pour mettre à jour une commande par son ID avec validation
export const updateOrder = [
    // Ajouter des validateurs
    body('IdUtilisateur').optional().isInt().withMessage('ID utilisateur doit être un entier'),
    body('DateCom').optional().isISO8601().withMessage('La date de commande doit être une date valide'),
    // Ajoutez d'autres validations selon vos besoins

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
            const [updated] = await Commandes.update(req.body, { where: { iIdCommande: req.params.id } });
            if (updated) {
                const updatedOrder = await Commandes.findByPk(req.params.id);
                res.status(200).json(updatedOrder);
            } else {
                res.status(404).json({ error: 'Commande non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
        }
    }
];

// Fonction pour supprimer une commande par son ID
export const deleteOrder = async (req, res) => {
    try {
        const deleted = await Commandes.destroy({ where: { IdCommande: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
    }
};