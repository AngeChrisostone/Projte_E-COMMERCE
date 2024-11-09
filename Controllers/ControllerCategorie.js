import Categorie from '../models/Categorie.js';

// Fonction pour récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll({ include: ['produits'] });
        res.status(200).json(categories);
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

// Fonction pour créer une nouvelle catégorie
export const createCategory = async (req, res) => {
    try {
        const newCategory = await Categorie.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
    }
};

// Fonction pour mettre à jour une catégorie par son ID
export const updateCategory = async (req, res) => {
    try {
        const [updated] = await Categorie.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedCategory = await Categorie.findByPk(req.params.id);
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ error: 'Catégorie non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
    }
};

// Fonction pour supprimer une catégorie par son ID
export const deleteCategory = async (req, res) => {
    try {
        const deleted = await Categorie.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Catégorie non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
    }
};
