import { body, validationResult } from 'express-validator';
import Relations from '../models/Relations.js';

const { Panier, Produits, PanierProduits } = Relations;

// Création d’un panier
export const createCart = async (req, res) => {
    try {
        // Récupérer l'ID utilisateur à partir du corps de la requête
        const { IdUtilisateur } = req.body;

        // Vérifier si l'ID utilisateur est fourni
        if (!IdUtilisateur) {
            return res.status(400).json({ error: 'L\'ID utilisateur est requis.' });
        }

        // Vérifier si un panier existe déjà pour cet utilisateur
        const existingCart = await Panier.findOne({ where: { IdUtilisateur } });
        if (existingCart) {
            return res.status(400).json({ error: 'Un panier existe déjà pour cet utilisateur.' });
        }

        // Créer un nouveau panier pour l'utilisateur
        const newCart = await Panier.create({ IdUtilisateur });

        // Répondre avec le panier créé
        res.status(201).json({
            message: 'Panier créé avec succès.',
            data: newCart
        });
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({
            error: 'Erreur lors de la création du panier.',
            details: error.message
        });
    }
};

// Récupérer le panier d’un utilisateur
export const getUserCart = async (req, res) => {
    try {
        // Récupérer l'ID utilisateur depuis les paramètres de la requête
        const { IdUtilisateur } = req.params;

        // Chercher le panier de l'utilisateur et inclure les produits associés
        const cart = await Panier.findOne({
            where: { IdUtilisateur },
            include: [
                {
                    model: Produits,
                    as: 'produits', // Assurer que l'association entre Panier et Produits est correctement définie
                    through: { attributes: ['Quantite'] } // Inclure la quantité des produits dans la réponse
                }
            ]
        });

        // Si aucun panier n'est trouvé pour cet utilisateur
        if (!cart) {
            return res.status(404).json({ error: 'Aucun panier trouvé pour cet utilisateur.' });
        }

        // Répondre avec les informations du panier et les produits associés
        res.status(200).json(cart); // Retourne le panier avec les produits associés
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ error: 'Erreur lors de la récupération du panier.', details: error.message });
    }
};

// Ajouter un produit au panier
export const addItemToCart = [
    // Validation des données entrantes
    body('IdUtilisateur').isInt().withMessage('ID utilisateur doit être un entier'),
    body('IdProduit').isInt().withMessage('ID produit doit être un entier'),
    body('Quantite').isInt().withMessage('La quantité doit être un entier'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { IdUtilisateur, IdProduit, Quantite } = req.body;

            // Vérifier si un panier existe déjà pour cet utilisateur
            let cart = await Panier.findOne({ where: { IdUtilisateur } });

            if (!cart) {
                // Si le panier n'existe pas, crée un nouveau panier
                cart = await Panier.create({ IdUtilisateur });
                console.log("Nouveau panier créé pour l'utilisateur", IdUtilisateur);
            } else {
                console.log("Panier existant trouvé pour l'utilisateur", IdUtilisateur);
            }

            // Vérifier si le produit existe
            const product = await Produits.findOne({ where: { IdProduit } });
            if (!product) {
                return res.status(404).json({ error: 'Produit non trouvé.' });
            }

            // Ajouter le produit au panier avec la quantité
            await cart.addProduit(IdProduit, { through: { Quantite } });

            res.status(201).json({ message: 'Produit ajouté au panier.' });
        } catch (error) {
            console.error(error); // Affiche l'erreur exacte dans les logs
            res.status(500).json({ error: 'Erreur lors de l\'ajout du produit au panier.' });
        }
    }
];

// Supprimer un produit du panier
export const removeItemFromCart = [
    body('IdUtilisateur').isInt().withMessage('ID utilisateur doit être un entier'),
    body('IdProduit').isInt().withMessage('ID produit doit être un entier'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { IdUtilisateur, IdProduit } = req.body;

            // Vérifier si le panier existe
            const cart = await Panier.findOne({ where: { IdUtilisateur } });
            if (!cart) {
                return res.status(404).json({ error: 'Panier non trouvé pour cet utilisateur.' });
            }

            // Supprimer le produit du panier
            await cart.removeProduit(IdProduit);
            res.status(204).json({ message: 'Produit supprimé du panier.' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression du produit du panier.' });
        }
    }
];
