// Importer express
import express from 'express';
// Importer le modèle Utilisateurs depuis l'export par défaut
import models from '../models/Relations.js'; // Importer l'objet complet
const { Utilisateurs } = models;  // Accéder à Utilisateurs depuis l'objet

const autoriser = (roles) => async (req, res, next) => {
  // Récupérer l'ID de l'utilisateur depuis la requête
  const userId = req.userId;

  try {
    // Vérifier si l'utilisateur existe
    const user = await Utilisateurs.findByPk(userId); // Utiliser Utilisateurs ici
    if (!user) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas!" });
    }

    // Récupérer les rôles de l'utilisateur
    const userRoles = await user.getRoles(); // Assurez-vous que getRoles() est correctement défini dans le modèle
    const userRoleTitles = userRoles.map((role) => role.titre.toLowerCase());

    // Vérifier si l'utilisateur a au moins un rôle requis
    const hasRole = roles.some((role) => userRoleTitles.includes(role.toLowerCase()));

    if (!hasRole) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à accéder à cette route." });
    }

    // Passer au middleware suivant si autorisation réussie
    next();
  } catch (error) {
    // Gérer les erreurs et renvoyer un message d'erreur
    res.status(500).json({ message: error.message });
  }
};

export default autoriser;
