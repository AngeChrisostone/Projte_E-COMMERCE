import Produits from '../models/Produits.js';

// Fonction pour récupérer tous les produits avec pagination
export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const products = await Produits.findAndCountAll({
            include: ['categorie', 'avis', 'imagesProduits'],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(products.count / limit);

        res.status(200).json({
            data: products.rows,
            meta: {
                totalItems: products.count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
};

// Fonction pour récupérer un produit par son ID
export const getProductById = async (req, res) => {
    try {
        const product = await Produits.findByPk(req.params.id, { include: ['categorie', 'avis', 'imagesProduits'] });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
    }
};

// Fonction pour créer un nouveau produit
export const createProduct = async (req, res) => {
    try {
        const newProduct = await Produits.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du produit' });
    }
};

// Fonction pour mettre à jour un produit par son ID
export const updateProduct = async (req, res) => {
    try {
        const [updated] = await Produits.update(req.body, { where: { IdProduit: req.params.id } });
        if (updated) {
            const updatedProduct = await Produits.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
    }
};

// Fonction pour supprimer un produit par son ID
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Produits.destroy({ where: { IdProduit: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
    }
};

// Fonction pour récupérer les avis d'un produit par son ID
export const getProductReviews = async (req, res) => {
    try {
        const product = await Produits.findByPk(req.params.id, { include: ['avis'] });
        if (product) {
            res.status(200).json(product.avis);
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des avis du produit' });
    }
};
