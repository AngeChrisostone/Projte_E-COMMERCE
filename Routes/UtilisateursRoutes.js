import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserOrders,
} from '../Controllers/ControllerUtilisateurs.js';

// Import des middlewares d'authentification et d'autorisation
import { login } from '../Authentification/login.js';
import { verifierToken } from '../Authentification/VerifierTokens.js';
import { autorisation } from '../Authentification/Autorisation.js';

const router = express.Router();

// Route de connexion
router.post('/login', login);

// Routes protégées par le middleware d'authentification
router.get('/', getAllUsers); // Accessible à tout utilisateur authentifié
router.get('/:id', getUserById); // Accessible à tout utilisateur authentifié
router.post('/', createUser); // Accessible uniquement aux admin
router.put('/:id',  updateUser); // Accessible uniquement aux admin
router.delete('/:id',  deleteUser); // Accessible uniquement aux admin
router.get('/:id/commandes',  getUserOrders); // Accessible à tout utilisateur authentifié

export default router;