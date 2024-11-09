import Role from '../models/Role.js';

// Fonction pour récupérer tous les rôles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({ include: ['utilisateurs'] }); // Inclut les utilisateurs associés au rôle
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
    }
};

// Fonction pour récupérer un rôle par son ID
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id, { include: ['utilisateurs'] });
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ error: 'Rôle non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du rôle' });
    }
};

// Fonction pour créer un nouveau rôle
export const createRole = async (req, res) => {
    try {
        const newRole = await Role.create(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du rôle' });
    }
};

// Fonction pour mettre à jour un rôle par son ID
export const updateRole = async (req, res) => {
    try {
        const [updated] = await Role.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedRole = await Role.findByPk(req.params.id);
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ error: 'Rôle non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle' });
    }
};

// Fonction pour supprimer un rôle par son ID
export const deleteRole = async (req, res) => {
    try {
        const deleted = await Role.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Rôle non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
    }
};
