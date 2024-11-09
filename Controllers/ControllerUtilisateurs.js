// Import des modèles Utilisateurs, Panier, Commandes et Role
import Utilisateurs from '../models/Utilisateurs.js';
import Panier from '../models/Panier.js';
import Commandes from '../models/Commandes.js';
import Role from '../models/Role.js';

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        // Récupère tous les utilisateurs avec leurs paniers, commandes et rôle associé
        const users = await Utilisateurs.findAll({ include: ['paniers', 'commandes', 'role'] });
        // Envoie la liste des utilisateurs en réponse avec un statut 200 (succès)
        res.status(200).json(users);
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500 (erreur serveur)
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};

// Fonction pour récupérer un utilisateur spécifique par son ID
export const getUserById = async (req, res) => {
    try {
        // Récupère l'utilisateur avec l'ID donné et inclut les paniers, commandes et rôle
        const user = await Utilisateurs.findByPk(req.params.id, { include: ['paniers', 'commandes', 'role'] });
        if (user) {
            // Si l'utilisateur est trouvé, envoie ses informations avec un statut 200
            res.status(200).json(user);
        } else {
            // Si l'utilisateur n'est pas trouvé, envoie un message d'erreur avec un statut 404 (non trouvé)
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

// Fonction pour créer un nouvel utilisateur
export const createUser = async (req, res) => {
    try {
        // Crée un nouvel utilisateur avec les données fournies dans la requête
        const newUser = await Utilisateurs.create(req.body);
        // Envoie les informations de l'utilisateur créé avec un statut 201 (créé)
        res.status(201).json(newUser);
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};

// Fonction pour mettre à jour un utilisateur par son ID
export const updateUser = async (req, res) => {
    try {
        // Met à jour les informations de l'utilisateur avec l'ID donné
        const [updated] = await Utilisateurs.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            // Si l'utilisateur est mis à jour, récupère et envoie ses nouvelles informations
            const updatedUser = await Utilisateurs.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            // Si l'utilisateur n'est pas trouvé, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};

// Fonction pour supprimer un utilisateur par son ID
export const deleteUser = async (req, res) => {
    try {
        // Supprime l'utilisateur avec l'ID donné
        const deleted = await Utilisateurs.destroy({ where: { id: req.params.id } });
        if (deleted) {
            // Si l'utilisateur est supprimé, envoie un statut 204 (pas de contenu)
            res.status(204).json();
        } else {
            // Si l'utilisateur n'est pas trouvé, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};

// Fonction pour récupérer les commandes d'un utilisateur par son ID
export const getUserOrders = async (req, res) => {
    try {
        // Récupère l'utilisateur avec ses commandes en fonction de l'ID donné
        const user = await Utilisateurs.findByPk(req.params.id, { include: ['commandes'] });
        if (user) {
            // Si l'utilisateur est trouvé, envoie ses commandes
            res.status(200).json(user.commandes);
        } else {
            // Si l'utilisateur n'est pas trouvé, envoie un message d'erreur avec un statut 404
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur avec un statut 500
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes de l\'utilisateur' });
    }
};
