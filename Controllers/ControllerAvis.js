import { body, validationResult } from 'express-validator';
import Avis from '../models/Avis.js';

// Fonction pour récupérer tous les avis avec pagination
export const getAllReviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const reviews = await Avis.findAndCountAll({
            include: ['produit', 'utilisateur'],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(reviews.count / limit);

        res.status(200).json({
            data: reviews.rows,
            meta: {
                totalItems: reviews.count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des avis' });
    }
};

// Fonction pour récupérer un avis par son ID
export const getReviewById = async (req, res) => {
    try {
        const review = await Avis.findByPk(req.params.id, { include: ['produit', 'utilisateur'] });
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Avis non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'avis' });
    }
};

// Fonction pour créer un nouvel avis avec validation
export const createReview = [
    // Ajouter des validateurs
    body('Note').notEmpty().withMessage('La note est requise'),
    body('Commentaire').notEmpty().withMessage('Le commentaire est requis'),
    body('DateAvis').isDate().withMessage('La date de l\'avis doit être une date valide'),
    body('IdProduit').isInt().withMessage('ID produit doit être un entier'),
    body('IdUtilisateur').isInt().withMessage('ID utilisateur doit être un entier'),

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
            const newReview = await Avis.create(req.body);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de l\'avis' });
        }
    }
];

// Fonction pour mettre à jour un avis par son ID avec validation
export const updateReview = [
    // Ajouter des validateurs
    body('Note').optional().notEmpty().withMessage('La note est requise'),
    body('Commentaire').optional().notEmpty().withMessage('Le commentaire est requis'),
    body('DateAvis').optional().isDate().withMessage('La date de l\'avis doit être une date valide'),
    body('IdProduit').optional().isInt().withMessage('ID produit doit être un entier'),
    body('IdUtilisateur').optional().isInt().withMessage('ID utilisateur doit être un entier'),

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
            const [updated] = await Avis.update(req.body, { where: { IdAvis: req.params.id } });
            if (updated) {
                const updatedReview = await Avis.findByPk(req.params.id);
                res.status(200).json(updatedReview);
            } else {
                res.status(404).json({ error: 'Avis non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'avis' });
        }
    }
];

// Fonction pour supprimer un avis par son ID
export const deleteReview = async (req, res) => {
    try {
        const deleted = await Avis.destroy({ where: { IdAvis: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Avis non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'avis' });
    }
};