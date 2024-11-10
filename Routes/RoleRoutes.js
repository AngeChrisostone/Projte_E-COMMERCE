import express from 'express';
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/ControllerRole.js';

const router = express.Router();

router.get('/', getAllRoles);
router.get('/:id', getRoleById);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;
