import { body, validationResult } from 'express-validator';
import ImageProduits from '../models/ImageProduits.js';

// Fonction pour récupérer toutes les images de produits
export const getAllImages = async (req, res) => {
    try {
        const images = await ImageProduits.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des images de produits' });
    }
};

// Fonction pour récupérer une image de produit par son ID
export const getImageById = async (req, res) => {
    try {
        const image = await ImageProduits.findByPk(req.params.id);
        if (image) {
            res.status(200).json(image);
        } else {
            res.status(404).json({ error: 'Image non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'image' });
    }
};

// Fonction pour créer une nouvelle image de produit avec validation
export const createImage = [
    // Ajouter des validateurs
    body('UrlImage').notEmpty().withMessage('L\'URL de l\'image est requise'),
    body('IdProduit').isInt().withMessage('ID produit doit être un entier'),

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
            const newImage = await ImageProduits.create(req.body);
            res.status(201).json(newImage);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de l\'image' });
        }
    }
];

// Fonction pour mettre à jour une image de produit par son ID avec validation
export const updateImage = [
    // Ajouter des validateurs
    body('UrlImage').optional().notEmpty().withMessage('L\'URL de l\'image est requise'),
    body('IdProduit').optional().isInt().withMessage('ID produit doit être un entier'),

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
            const [updated] = await ImageProduits.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedImage = await ImageProduits.findByPk(req.params.id);
                res.status(200).json(updatedImage);
            } else {
                res.status(404).json({ error: 'Image non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image' });
        }
    }
];

// Fonction pour supprimer une image de produit par son ID
export const deleteImage = async (req, res) => {
    try {
        const deleted = await ImageProduits.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Image non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
    }
};