import Adresse from './Adresse';
import Avis from './Avis.js';
import Categorie from './Categorie.js';
import Commandes from './Commandes.js';
import Coupon from './Coupon.js';
import DetailsCommande from './DetailsCommande.js'
import ImagesProduit from './ImageProduits.js'




// Définir la relation entre Adresse et Utilisateur
Adresse.belongsTo(Utilisateur, {
    foreignKey: 'idUtilisateur',  // Clé étrangère dans Adresse
    as: 'utilisateur'  // Alias pour accéder à l'utilisateur associé
});

//relations Avis et utilisateurs

Avis.hasMany(Utilisateurs,{
    foreignKey:'IdUtilisateurs', 
    as:'Utilisateurs'
});

// relations entre categorie et produit
Categorie.hasMany(Produits,{
    foreignKey:'IdCategorie', 
    as:'Produits'
});

// Définir la relation entre Commande et Utilisateur
Commandes.belongsTo(Utilisateurs, {
    foreignKey: 'IdUtilisateur',  // Clé étrangère dans commande
    as: 'Utilisateurs'  // Alias pour accéder à l'utilisateur associé
});
// Définir la relation entre Commande et ModePaiement
Commandes.hasMany(ModeDePaiement, {
    foreignKey: 'IdModeDePaiement',  // Clé étrangère dans commande
    as: 'ModePaiment'  // Alias pour accéder au mode de paiement associé
});

// Définir la relation entre Commande et Coupon
Commandes.hasMany(Coupon, {
    foreignKey: 'IdCoupon',  // Clé étrangère dans commande
    as: 'Coupon'  // Alias pour accéder au coupon associé
});

//Coupon=> Commande
Coupon.hasOne(Commandes, {
    foreignKey: 'IdCoupon',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

//DetailsCommande=>Commande

DetailsCommande.belongsTo(Commandes, {
    foreignKey: 'IdCommandes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//images =>Produits
ImagesProduit.belongsTo(Produits, {
    foreignKey: 'IdProduits',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//ModeDepaiement=>Commandes
ModeDePaiement.belongsTo(Commandes,{
    foreignKey:'IdCommandes', 
    as:'Commandes'
})

// Panier=>Utilisateurs

Panier.belongsTo(Utilisateurs, {

    foreignKey: 'IdUtilisateurs',
  
    as: 'Utilisateur'
  
  });
  
  
  //Paniers=>Produits
  Panier.hasMany(Produits, {
  
    foreignKey: 'IdProduit',
  
    as: 'Produit'
  
  });

  // Définir la relation entre Produits et categorie
Produits.belongsToMany(Categorie,{
    foreignKey: 'IdCategorie',  // Clé étrangère dans produits
    as: 'Categorie',  // Alias pour accéder à la categorie associé
});
// Définir la relation entre Produits et Panier
Produits.belongsTo(Panier,{
    foreignKey: 'IdPanier', 
    constraints:false, // pas cle etrangere 
    as: 'Panier',  // Alias pour accéder au panier associé
});
// Définir la relation entre Produits et Panier
Produits.hasMany(Avis,{
    foreignKey: 'IdAvis', 
    constraints:false, // pas cle etrangere 
    as: 'Avis',  // Alias pour accéder au panier associé
});

//Produits=>ImagesProduits
Produits.hasMany(ImagesProduit,{
    foreignKey: 'IdImageProduits', 
    constraints:false, // pas cle etrangere 
    as: 'ImageProduits',  // Alias pour accéder au panier associé
});

// Définir la relation entre Role et Utilisateur

Role.hasMany(Utilisateurs, {

    foreignKey: 'IdRole',
  
    as: 'Utilisateurs'
  
  });


  // Définir les relations

Utilisateurs.hasMany(Role, {

    foreignKey: 'IdRole',
  
    as: 'Role'
  
  });
  
  
  
  Utilisateurs.hasMany(Panier, {
  
    foreignKey: 'IdUtilisateur',
  
    as: 'Paniers'
  
  });
  
  
  
  Utilisateurs.hasMany(Commande, {
  
    foreignKey: 'IdUtilisateurs',
  
    as: 'Commandes'
  
  });

