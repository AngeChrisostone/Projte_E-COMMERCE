import Produits from '../models/Produits.js';
import Categorie from '../models/Categorie.js';
import Avis from '../models/Avis.js';
import ImagesProduit from '../models/ImagesProduit.js';

// Fonction pour récupérer tous les produits
export const getAllProducts = async (req, res) => {
    try {
        // Récupère tous les produits avec leur catégorie, avis et images associées
        const products = await Produits.findAll({ include: ['categorie', 'avis', 'imagesProduits'] });
        // Envoie la liste des produits en réponse avec un statut 200 (succès)
        res.status(200).json(products);
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500 (erreur serveur)
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
};

// Fonction pour récupérer un produit spécifique par son ID
export const getProductById = async (req, res) => {
    try {
        // Récupère le produit avec l'ID donné et inclut sa catégorie, ses avis et ses images
        const product = await Produits.findByPk(req.params.id, { include: ['categorie', 'avis', 'imagesProduits'] });
        if (product) {
            // Si le produit est trouvé, envoie ses informations avec un statut 200
            res.status(200).json(product);
        } else {
            // Si le produit n'est pas trouvé, envoie un message d'erreur avec un statut 404 (non trouvé)
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
    }
};

// Fonction pour créer un nouveau produit
export const createProduct = async (req, res) => {
    try {
        // Crée un nouveau produit avec les données fournies dans la requête
        const newProduct = await Produits.create(req.body);
        // Envoie les informations du produit créé avec un statut 201 (créé)
        res.status(201).json(newProduct);
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la création du produit' });
    }
};

// Fonction pour mettre à jour un produit par son ID
export const updateProduct = async (req, res) => {
    try {
        // Met à jour les informations du produit avec l'ID donné
        const [updated] = await Produits.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            // Si le produit est mis à jour, récupère et envoie ses nouvelles informations
            const updatedProduct = await Produits.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            // Si le produit n'est pas trouvé, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
    }
};

// Fonction pour supprimer un produit par son ID
export const deleteProduct = async (req, res) => {
    try {
        // Supprime le produit avec l'ID donné
        const deleted = await Produits.destroy({ where: { id: req.params.id } });
        if (deleted) {
            // Si le produit est supprimé, envoie un statut 204 (pas de contenu)
            res.status(204).json();
        } else {
            // Si le produit n'est pas trouvé, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
    }
};

// Fonction pour récupérer les avis d'un produit par son ID
export const getProductReviews = async (req, res) => {
    try {
        // Récupère le produit avec ses avis en fonction de l'ID donné
        const product = await Produits.findByPk(req.params.id, { include: ['avis'] });
        if (product) {
            // Si le produit est trouvé, envoie ses avis
            res.status(200).json(product.avis);
        } else {
            // Si le produit n'est pas trouvé, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la récupération des avis du produit' });
    }
};
