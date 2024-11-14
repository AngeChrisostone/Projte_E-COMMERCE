import { body, validationResult } from 'express-validator';
import Relations from '../models/Relations.js';
const { Categorie } = Relations;


// Fonction pour récupérer toutes les catégories avec pagination
export const getAllCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const categories = await Categorie.findAndCountAll({
            include: ['produits'],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(categories.count / limit);

        res.status(200).json({
            data: categories.rows,
            meta: {
                totalItems: categories.count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
};

// Fonction pour récupérer une catégorie par son ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Categorie.findByPk(req.params.id, { include: ['produits'] });
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Catégorie non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie' });
    }
};

// Fonction pour créer une nouvelle catégorie avec validation
export const createCategory = [
    // Ajouter des validateurs
    body('Nom').notEmpty().withMessage('Le nom est requis'),
    body('Description').notEmpty().withMessage('La description est requise'),

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
            const newCategory = await Categorie.create(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
        }
    }
];

// Fonction pour mettre à jour une catégorie par son ID avec validation
export const updateCategory = [
    // Ajouter des validateurs
    body('Nom').optional().notEmpty().withMessage('Le nom est requis'),
    body('Description').optional().notEmpty().withMessage('La description est requise'),

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
            const [updated] = await Categorie.update(req.body, { where: { IdCategorie: req.params.id } });
            if (updated) {
                const updatedCategory = await Categorie.findByPk(req.params.id);
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Catégorie non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
        }
    }
];

// Fonction pour supprimer une catégorie par son ID
export const deleteCategory = async (req, res) => {
    try {
        const deleted = await Categorie.destroy({ where: { IdCategorie: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Catégorie non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
    }
};