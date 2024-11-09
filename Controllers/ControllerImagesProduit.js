import ImagesProduit from '../models/ImagesProduit.js';

// Fonction pour récupérer toutes les images de produits
export const getAllImages = async (req, res) => {
    try {
        const images = await ImagesProduit.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des images de produits' });
    }
};

// Fonction pour récupérer une image de produit par son ID
export const getImageById = async (req, res) => {
    try {
        const image = await ImagesProduit.findByPk(req.params.id);
        if (image) {
            res.status(200).json(image);
        } else {
            res.status(404).json({ error: 'Image non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'image' });
    }
};

// Fonction pour créer une nouvelle image de produit
export const createImage = async (req, res) => {
    try {
        const newImage = await ImagesProduit.create(req.body);
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'image' });
    }
};

// Fonction pour mettre à jour une image de produit par son ID
export const updateImage = async (req, res) => {
    try {
        const [updated] = await ImagesProduit.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedImage = await ImagesProduit.findByPk(req.params.id);
            res.status(200).json(updatedImage);
        } else {
            res.status(404).json({ error: 'Image non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image' });
    }
};

// Fonction pour supprimer une image de produit par son ID
export const deleteImage = async (req, res) => {
    try {
        const deleted = await ImagesProduit.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Image non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
    }
};
