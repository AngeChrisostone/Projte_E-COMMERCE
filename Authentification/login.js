// Authentification/login.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import Utilisateurs from '../models/Utilisateurs.js';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';

export const login = async (req, res) => {
  // Vérification des erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Récupération des informations de connexion depuis la requête
  const { Email, MotDePasse } = req.body;

  try {
    // Recherche de l'utilisateur par email
    const user = await Utilisateurs.findOne({ where: { Email } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(MotDePasse, user.MotDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Génération du token JWT avec un payload contenant l'ID utilisateur et le rôle
    const token = jwt.sign(
      { userId: user.IdUtilisateur, role: user.IdRole },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Réponse avec le token généré
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};