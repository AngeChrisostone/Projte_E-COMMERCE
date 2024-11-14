import { body, validationResult } from 'express-validator';
import Relations from '../models/Relations.js';
const { Panier} = Relations;
const { Produits } = Relations;

// Fonction pour récupérer le panier d'un utilisateur par son ID
export const getUserCart = async (req, res) => {
    try {
        const cart = await Panier.findOne({
            where: { IdUtilisateur: req.params.userId },
            include: ['produits']
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du panier' });
    }
};

// Fonction pour ajouter un produit au panier d'un utilisateur avec validation
export const addItemToCart = [
    // Ajouter des validateurs
    body('userId').isInt().withMessage('ID utilisateur doit être un entier'),
    body('productId').isInt().withMessage('ID produit doit être un entier'),
    body('quantity').isInt().withMessage('La quantité doit être un entier'),

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
            const cart = await Panier.findOne({ where: { IdUtilisateur: req.body.userId } });
            if (cart) {
                await cart.addProduit(req.body.productId, { through: { quantity: req.body.quantity } });
                res.status(201).json({ message: 'Produit ajouté au panier' });
            } else {
                res.status(404).json({ error: 'Panier non trouvé pour cet utilisateur' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l\'ajout du produit au panier' });
        }
    }
];

// Fonction pour supprimer un produit du panier d'un utilisateur avec validation
export const removeItemFromCart = [
    // Ajouter des validateurs
    body('userId').isInt().withMessage('ID utilisateur doit être un entier'),
    body('productId').isInt().withMessage('ID produit doit être un entier'),

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
            const cart = await Panier.findOne({ where: { IdUtilisateur: req.body.userId } });
            if (cart) {
                await cart.removeProduit(req.body.productId);
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Panier non trouvé pour cet utilisateur' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression du produit du panier' });
        }
    }
];