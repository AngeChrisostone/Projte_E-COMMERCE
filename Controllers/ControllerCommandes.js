import Commandes from '../models/Commandes.js';
import DetailsCommande from '../models/DetailsCommande.js';

// Fonction pour récupérer toutes les commandes
export const getAllOrders = async (req, res) => {
    try {
        // Récupère toutes les commandes avec les détails associés
        const orders = await Commandes.findAll({ include: ['detailsCommande', 'modePaiement', 'coupon'] });
        // Envoie la liste des commandes en réponse avec un statut 200 (succès)
        res.status(200).json(orders);
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500 (erreur serveur)
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
};

// Fonction pour récupérer une commande par son ID
export const getOrderById = async (req, res) => {
    try {
        // Récupère la commande avec l'ID donné et inclut les détails
        const order = await Commandes.findByPk(req.params.id, { include: ['detailsCommande', 'modePaiement', 'coupon'] });
        if (order) {
            // Si la commande est trouvée, envoie ses informations
            res.status(200).json(order);
        } else {
            // Si la commande n'est pas trouvée, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Commande non trouvée' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
};

// Fonction pour créer une nouvelle commande
import { body, validationResult } from 'express-validator';

export const createOrder = [
    body('IdUtilisateur').isInt(),
    body('DateCom').isISO8601(),
    // Ajoutez d'autres validations selon vos besoins
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newOrder = await Commandes.create(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de la commande', details: error.message });
        }
    }
];

// Fonction pour mettre à jour une commande par son ID
export const updateOrder = async (req, res) => {
    try {
        // Met à jour les informations de la commande avec l'ID donné
        const [updated] = await Commandes.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            // Si la commande est mise à jour, envoie ses nouvelles informations
            const updatedOrder = await Commandes.findByPk(req.params.id);
            res.status(200).json(updatedOrder);
        } else {
            // Si la commande n'est pas trouvée, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Commande non trouvée' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
    }
};

// Fonction pour supprimer une commande par son ID
export const deleteOrder = async (req, res) => {
    try {
        // Supprime la commande avec l'ID donné
        const deleted = await Commandes.destroy({ where: { id: req.params.id } });
        if (deleted) {
            // Si la commande est supprimée, envoie un statut 204 (pas de contenu)
            res.status(204).json();
        } else {
            // Si la commande n'est pas trouvée, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Commande non trouvée' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
    }
};
