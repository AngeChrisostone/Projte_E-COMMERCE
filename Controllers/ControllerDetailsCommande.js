import { body, validationResult } from 'express-validator';
import Relations from '../models/Relations.js';
const { DetailsCommande } = Relations;


// Fonction pour récupérer tous les détails de commande
export const getAllOrderDetails = async (req, res) => {
    try {
        const details = await DetailsCommande.findAll();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des détails de commande' });
    }
};

// Fonction pour récupérer un détail de commande par son ID
export const getOrderDetailById = async (req, res) => {
    try {
        const detail = await DetailsCommande.findByPk(req.params.id);
        if (detail) {
            res.status(200).json(detail);
        } else {
            res.status(404).json({ error: 'Détail de commande non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du détail de commande' });
    }
};

// Fonction pour créer un nouveau détail de commande avec validation
export const createOrderDetail = [
    // Ajouter des validateurs
    body('IdCommande').isInt().withMessage('ID commande doit être un entier'),
    body('IdProduit').isInt().withMessage('ID produit doit être un entier'),
    body('Quantite').isInt().withMessage('La quantité doit être un entier'),
    body('Prix').isDecimal().withMessage('Le prix doit être un nombre décimal'),

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
            const newDetail = await DetailsCommande.create(req.body);
            res.status(201).json(newDetail);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création du détail de commande' });
        }
    }
];

// Fonction pour mettre à jour un détail de commande par son ID avec validation
export const updateOrderDetail = [
    // Ajouter des validateurs
    body('IdCommande').optional().isInt().withMessage('ID commande doit être un entier'),
    body('IdProduit').optional().isInt().withMessage('ID produit doit être un entier'),
    body('Quantite').optional().isInt().withMessage('La quantité doit être un entier'),
    body('Prix').optional().isDecimal().withMessage('Le prix doit être un nombre décimal'),

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
            const [updated] = await DetailsCommande.update(req.body, { where: { IdDetailsCom: req.params.id } });
            if (updated) {
                const updatedDetail = await DetailsCommande.findByPk(req.params.id);
                res.status(200).json(updatedDetail);
            } else {
                res.status(404).json({ error: 'Détail de commande non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour du détail de commande' });
        }
    }
];

// Fonction pour supprimer un détail de commande par son ID
export const deleteOrderDetail = async (req, res) => {
    try {
        const deleted = await DetailsCommande.destroy({ where: { IdDetailsCom: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Détail de commande non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du détail de commande' });
    }
};