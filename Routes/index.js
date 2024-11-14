import express from 'express';
import AdresseRoutes from './AdresseRoutes.js'
import AvisRoutes from './AvisRoutes.js';
import CategorieRoutes from './CategorieRoutes.js';
import CommandesRoutes from './CommandesRoutes.js';
import CouponRoutes from './CouponRoutes.js';
import DetailsCommandeRoutes from './DetailsCommandeRoutes.js';
import ImageProduitsRoutes from './ImageProduitsRoutes.js';
import ModeDePaiementRoutes from './ModeDePaiementRoutes.js';
import PanierRoutes from './PanierRoutes.js';
import ProduitsRoutes from './ProduitsRoutes.js';
import RoleRoutes from './RoleRoutes.js';
import UtilisateursRoutes from './UtilisateursRoutes.js';
import AuthRoutes from './AuthRoutes.js'

const router = express.Router();

router.use('/adresse', AdresseRoutes);
router.use('/avis', AvisRoutes);
router.use('/categorie', CategorieRoutes);
router.use('/commandes', CommandesRoutes);
router.use('/coupon', CouponRoutes);
router.use('/detailscommande', DetailsCommandeRoutes);
router.use('/imageproduits', ImageProduitsRoutes);
router.use('/modedepaiement', ModeDePaiementRoutes);
router.use('/panier', PanierRoutes);
router.use('/produits', ProduitsRoutes);
router.use('/role', RoleRoutes);
router.use('/utilisateurs', UtilisateursRoutes);
router.use('/', AuthRoutes);

export default router;


