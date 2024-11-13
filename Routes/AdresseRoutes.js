
import express from 'express';
import { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress } from '../controllers/ControllerAdresse.js';

const router = express.Router();

router.get('/', getAllAddresses);
router.get('/:id', getAddressById);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;

