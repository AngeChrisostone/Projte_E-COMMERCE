import Adresse from '../models/Adresse.js';

// Fonction pour récupérer toutes les adresses
export const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Adresse.findAll({ include: ['utilisateur'] }); // Inclut l'utilisateur associé à chaque adresse
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des adresses' });
    }
};

// Fonction pour récupérer une adresse par son ID
export const getAddressById = async (req, res) => {
    try {
        const address = await Adresse.findByPk(req.params.id, { include: ['utilisateur'] });
        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({ error: 'Adresse non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'adresse' });
    }
};

// Fonction pour créer une nouvelle adresse
export const createAddress = async (req, res) => {
    try {
        const newAddress = await Adresse.create(req.body);
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'adresse' });
    }
};

// Fonction pour mettre à jour une adresse par son ID
export const updateAddress = async (req, res) => {
    try {
        const [updated] = await Adresse.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedAddress = await Adresse.findByPk(req.params.id);
            res.status(200).json(updatedAddress);
        } else {
            res.status(404).json({ error: 'Adresse non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'adresse' });
    }
};

// Fonction pour supprimer une adresse par son ID
export const deleteAddress = async (req, res) => {
    try {
        const deleted = await Adresse.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Adresse non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'adresse' });
    }
};
