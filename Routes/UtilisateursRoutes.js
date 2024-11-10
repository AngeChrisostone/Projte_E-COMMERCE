import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserOrders } from '../controllers/ControllerUtilisateurs.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/commandes', getUserOrders);

export default router;

