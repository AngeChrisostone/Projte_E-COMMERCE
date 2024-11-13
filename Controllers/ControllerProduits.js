import { body, validationResult } from 'express-validator';
import Produits from '../models/Produits.js';

// Fonction pour récupérer tous les produits avec pagination
export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const products = await Produits.findAndCountAll({
            include: ['categorie', 'avis', 'imagesProduits'],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(products.count / limit);

        res.status(200).json({
            data: products.rows,
            meta: {
                totalItems: products.count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
};

// Fonction pour récupérer un produit par son ID
export const getProductById = async (req, res) => {
    try {
        const product = await Produits.findByPk(req.params.id, { include: ['categorie', 'avis', 'imagesProduits'] });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
    }
};

// Fonction pour créer un nouveau produit avec validation
export const createProduct = [
    // Ajouter des validateurs
    body('NomProduit').notEmpty().withMessage('Le nom du produit est requis'),
    body('DescriptionProd').notEmpty().withMessage('La description du produit est requise'),
    body('PrixProd').isFloat().withMessage('Le prix du produit doit être un nombre décimal'),
    body('StockProd').isInt().withMessage('Le stock du produit doit être un entier'),
    body('IdCategorie').isInt().withMessage('ID catégorie doit être un entier'),

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
            const newProduct = await Produits.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la création du produit' });
        }
    }
];

// Fonction pour mettre à jour un produit par son ID avec validation
export const updateProduct = [
    // Ajouter des validateurs
    body('NomProduit').optional().notEmpty().withMessage('Le nom du produit est requis'),
    body('DescriptionProd').optional().notEmpty().withMessage('La description du produit est requise'),
    body('PrixProd').optional().isFloat().withMessage('Le prix du produit doit être un nombre décimal'),
    body('StockProd').optional().isInt().withMessage('Le stock du produit doit être un entier'),
    body('IdCategorie').optional().isInt().withMessage('ID catégorie doit être un entier'),

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
            const [updated] = await Produits.update(req.body, { where: { IdProduit: req.params.id } });
            if (updated) {
                const updatedProduct = await Produits.findByPk(req.params.id);
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Produit non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
        }
    }
];

// Fonction pour supprimer un produit par son ID
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Produits.destroy({ where: { IdProduit: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
    }
};

// Fonction pour récupérer les avis d'un produit par son ID
export const getProductReviews = async (req, res) => {
    try {
        const product = await Produits.findByPk(req.params.id, { include: ['avis'] });
        if (product) {
            res.status(200).json(product.avis);
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des avis du produit' });
    }
};