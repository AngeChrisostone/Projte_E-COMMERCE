import Coupon from '../models/Coupon.js';

// Fonction pour récupérer tous les coupons
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des coupons' });
    }
};

// Fonction pour récupérer un coupon par son ID
export const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findByPk(req.params.id);
        if (coupon) {
            res.status(200).json(coupon);
        } else {
            res.status(404).json({ error: 'Coupon non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du coupon' });
    }
};

// Fonction pour créer un nouveau coupon
export const createCoupon = async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du coupon' });
    }
};

// Fonction pour mettre à jour un coupon par son ID
export const updateCoupon = async (req, res) => {
    try {
        const [updated] = await Coupon.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedCoupon = await Coupon.findByPk(req.params.id);
            res.status(200).json(updatedCoupon);
        } else {
            res.status(404).json({ error: 'Coupon non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du coupon' });
    }
};

// Fonction pour supprimer un coupon par son ID
export const deleteCoupon = async (req, res) => {
    try {
        const deleted = await Coupon.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Coupon non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du coupon' });
    }
};
