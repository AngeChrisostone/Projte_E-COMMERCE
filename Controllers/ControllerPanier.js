import Panier from '../models/Panier.js';
import Produits from '../models/Produits.js';

// Fonction pour récupérer le panier d'un utilisateur par son ID
export const getUserCart = async (req, res) => {
    try {
        // Récupère le panier de l'utilisateur avec ses produits
        const cart = await Panier.findOne({
            where: { IdUtilisateur: req.params.userId },
            include: ['produits']
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du panier' });
    }
};

// Fonction pour ajouter un produit au panier d'un utilisateur
export const addItemToCart = async (req, res) => {
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
};

// Fonction pour supprimer un produit du panier d'un utilisateur
export const removeItemFromCart = async (req, res) => {
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
};
