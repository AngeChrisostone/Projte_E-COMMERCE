import Adresse from './Adresse.js'
import Avis from './Avis.js';
import Categorie from './Categorie.js';
import Commandes from './Commandes.js';
import Coupon from './Coupon.js';
import DetailsCommande from './DetailsCommande.js';
import ImagesProduit from './ImageProduits.js';
import ModeDePaiement from './ModeDePaiement.js';
import Panier from './Panier.js';
import Produits from './Produits.js';
import Role from './Role.js';
import Utilisateurs from './Utilisateurs.js';

// Définir la relation entre Adresse et Utilisateur
Adresse.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Définir la relation entre Avis et Produits
Avis.belongsTo(Produits, {
    foreignKey: 'IdProduit',
    as: 'produit'
});

// Définir la relation entre Utilisateurs et Avis
Avis.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Définir la relation entre Categorie et Produits
Categorie.hasMany(Produits, {
    foreignKey: 'IdCategorie',
    as: 'produits'
});

// Définir la relation entre Commandes et Utilisateurs
Commandes.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Définir la relation entre Commandes et ModeDePaiement
Commandes.belongsTo(ModeDePaiement, {
    foreignKey: 'IdModeDePaiement',
    as: 'modePaiement'
});

// Définir la relation entre Commandes et Coupon
Commandes.belongsTo(Coupon, {
    foreignKey: 'IdCoupon',
    as: 'coupon'
});

//// Définir la relation entre Commandes et Details commande 
Commandes.hasMany(DetailsCommande, {
    foreignKey: 'IdCommande',
    as: 'detailsCommande'
});

// Définir la relation entre Coupon et Commandes
Coupon.hasOne(Commandes, {
    foreignKey: 'IdCoupon',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

// Définir la relation entre DetailsCommande et Commandes
DetailsCommande.belongsTo(Commandes, {
    foreignKey: 'IdCommande',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Définir la relation entre ImagesProduit et Produits
ImagesProduit.belongsTo(Produits, {
    foreignKey: 'IdProduit',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Définir la relation entre ModeDePaiement et Commandes
ModeDePaiement.hasMany(Commandes, {
    foreignKey: 'IdModeDePaiement',
    as: 'commandes'
});

// Définir la relation entre Panier et Utilisateurs
Panier.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',
    as: 'utilisateur'
});

// Définir la relation entre Panier et Produits
Panier.belongsToMany(Produits, {
    through: 'PanierProduits',
    foreignKey: 'IdPanier',
    otherKey: 'IdProduit',
    as: 'produits'
});

// Définir la relation entre Produits et Categorie
Produits.belongsTo(Categorie, {
    foreignKey: 'IdCategorie',
    as: 'categorie'
});

// Définir la relation entre Produits et Panier
Produits.belongsToMany(Panier, {
    through: 'PanierProduits',
    foreignKey: 'IdProduit',
    otherKey: 'IdPanier',
    as: 'paniers'
});

// Définir la relation entre Produits et Avis
Produits.hasMany(Avis, {
    foreignKey: 'IdProduit',
    as: 'avis'
});

// Définir la relation entre Produits et ImagesProduit
Produits.hasMany(ImagesProduit, {
    foreignKey: 'IdProduit',
    as: 'imagesProduits'
});

// Définir la relation entre Role et Utilisateurs
Role.hasMany(Utilisateurs, {
    foreignKey: 'IdRole',
    as: 'utilisateurs'
});

// Définir la relation entre Utilisateurs et Role
Utilisateurs.belongsTo(Role, {
    foreignKey: 'IdRole',
    as: 'role'
});

// Définir la relation entre Utilisateurs et Panier
Utilisateurs.hasMany(Panier, {
    foreignKey: 'IdUtilisateur',
    as: 'paniers'
});

// Définir la relation entre Utilisateurs et Commandes
Utilisateurs.hasMany(Commandes, {
    foreignKey: 'IdUtilisateur',
    as: 'commandes'
});
