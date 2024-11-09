import ModeDePaiement from '../models/ModeDePaiement.js';

// Fonction pour récupérer tous les modes de paiement
export const getAllPaymentMethods = async (req, res) => {
    try {
        const methods = await ModeDePaiement.findAll();
        res.status(200).json(methods);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des modes de paiement' });
    }
};

// Fonction pour récupérer un mode de paiement par son ID
export const getPaymentMethodById = async (req, res) => {
    try {
        const method = await ModeDePaiement.findByPk(req.params.id);
        if (method) {
            res.status(200).json(method);
        } else {
            res.status(404).json({ error: 'Mode de paiement non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du mode de paiement' });
    }
};

// Fonction pour créer un nouveau mode de paiement
export const createPaymentMethod = async (req, res) => {
    try {
        const newMethod = await ModeDePaiement.create(req.body);
        res.status(201).json(newMethod);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du mode de paiement' });
    }
};

// Fonction pour mettre à jour un mode de paiement par son ID
export const updatePaymentMethod = async (req, res) => {
    try {
        const [updated] = await ModeDePaiement.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedMethod = await ModeDePaiement.findByPk(req.params.id);
            res.status(200).json(updatedMethod);
        } else {
            res.status(404).json({ error: 'Mode de paiement non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du mode de paiement' });
    }
};

// Fonction pour supprimer un mode de paiement par son ID
export const deletePaymentMethod = async (req, res) => {
    try {
        const deleted = await ModeDePaiement.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Mode de paiement non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du mode de paiement' });
    }
};
