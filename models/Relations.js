import Adresse from '../models/Adresse.js';
import Avis from '../models/Avis.js';
import Categorie from '../models/Categorie.js';
import Commandes from '../models/Commandes.js';
import Coupon from '../models/Coupon.js';
import DetailsCommande from '../models/DetailsCommande.js';
import ImageProduits from './ImageProduits.js';
import ModeDePaiement from '../models/ModeDePaiement.js';
import Panier from '../models/Panier.js';
import Produits from '../models/Produits.js';
import Role from '../models/Role.js';
import Utilisateurs from '../models/Utilisateurs.js';
import PanierProduits from '../models/PanierProduits.js';

// Relation entre Adresse et Utilisateur
Adresse.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Relation entre Avis et Produits
Avis.belongsTo(Produits, {
    foreignKey: 'IdProduit',
    as: 'produit'
});

// Relation entre Utilisateurs et Avis
Avis.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Relation entre Categorie et Produits
Categorie.hasMany(Produits, {
    foreignKey: 'IdCategorie',
    as: 'produits'
});

// Relation entre Commandes et Utilisateurs
Commandes.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Relation entre Commandes et ModeDePaiement
Commandes.belongsTo(ModeDePaiement, {
    foreignKey: 'IdModeDePaiement',
    as: 'modePaiement'
});

// Relation entre Commandes et Coupon
Commandes.belongsTo(Coupon, {
    foreignKey: 'IdCoupon',
    as: 'coupon'
});

// Relation entre Commandes et DetailsCommande
Commandes.hasMany(DetailsCommande, {
    foreignKey: 'IdCommande',
    as: 'detailsCommande'
});

// Relation entre DetailsCommande et Commandes
DetailsCommande.belongsTo(Commandes, {
    foreignKey: 'IdCommande',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relation entre ImageProduits et Produits
ImageProduits.belongsTo(Produits, {
    foreignKey: 'IdProduit',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relation entre Panier et Utilisateurs
Panier.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Relation entre Panier et Produits via PanierProduits
Panier.belongsToMany(Produits, {
    through: PanierProduits,
    foreignKey: 'IdPanier',
    otherKey: 'IdProduit',
    as: 'produits'
});

// Relation entre Produits et Panier via PanierProduits
Produits.belongsToMany(Panier, {
    through: PanierProduits,
    foreignKey: 'IdProduit',
    otherKey: 'IdPanier',
    as: 'paniers'
});

// Relation entre Produits et Avis
Produits.hasMany(Avis, {
    foreignKey: 'IdProduit',
    as: 'avis'
});

// Relation entre Produits et ImagesProduit
Produits.hasMany(ImageProduits, {
    foreignKey: 'IdProduit',
    as: 'imageProduits'
});

// Relation entre Role et Utilisateurs
Role.hasMany(Utilisateurs, {
    foreignKey: 'IdRole',
    as: 'utilisateurs'
});

// Relation entre Utilisateurs et Role
Utilisateurs.belongsTo(Role, {
    foreignKey: 'IdRole',
    as: 'role'
});

// Relation entre Utilisateurs et Panier
Utilisateurs.hasMany(Panier, {
    foreignKey: 'IdUtilisateur',
    as: 'paniers'
});

// Relation entre Utilisateurs et Commandes
Utilisateurs.hasMany(Commandes, {
    foreignKey: 'IdUtilisateur',
    as: 'commandes'
});

export default {
    Adresse,
    Avis,
    Categorie,
    Commandes,
    Coupon,
    DetailsCommande,
    ImageProduits,
    ModeDePaiement,
    Panier,
    Produits,
    Role,
    Utilisateurs,
    PanierProduits
};
