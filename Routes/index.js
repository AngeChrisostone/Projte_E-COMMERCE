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

const router = express.Router();

router.use('/adresses', AdresseRoutes);
router.use('/avis', AvisRoutes);
router.use('/categories', CategorieRoutes);
router.use('/commandes', CommandesRoutes);
router.use('/coupons', CouponRoutes);
router.use('/detailscommande', DetailsCommandeRoutes);
router.use('/imagesproduits', ImageProduitsRoutes);
router.use('/modedepaiement', ModeDePaiementRoutes);
router.use('/panier', PanierRoutes);
router.use('/produits', ProduitsRoutes);
router.use('/roles', RoleRoutes);
router.use('/utilisateurs', UtilisateursRoutes);

export default router;


