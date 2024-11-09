import Avis from '../models/Avis.js';

// Fonction pour récupérer tous les avis
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Avis.findAll({ include: ['produit', 'utilisateur'] });
        res.status(200).json(reviews);
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

// Fonction pour créer un nouvel avis
export const createReview = async (req, res) => {
    try {
        const newReview = await Avis.create(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'avis' });
    }
};

// Fonction pour mettre à jour un avis par son ID
export const updateReview = async (req, res) => {
    try {
        const [updated] = await Avis.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedReview = await Avis.findByPk(req.params.id);
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ error: 'Avis non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'avis' });
    }
};

// Fonction pour supprimer un avis par son ID
export const deleteReview = async (req, res) => {
    try {
        const deleted = await Avis.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Avis non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'avis' });
    }
};
