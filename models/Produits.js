//Importer la base de données pour créer les modèles 
import database from "../Connexion.js";
import {DataTypes } from 'sequelize'

//Modele de la table  Produits

const Produits = database.define('Produits',{
    IdProduits: { type:DataTypes.INTEGER,allowNull:false, primaryKey: true, autoIncrement: true,},
    NomProduits :{ type:DataTypes.STRING,allowNull:false},
    DescriptionProd:{type:DataTypes.STRING,allowNull:false},
    PrixProd:{type:DataTypes.INTEGER,allowNull:false},
    StockProd:{type:DataTypes.INTEGER,allowNull:false},
    Pays:{type:DataTypes.STRING,allowNull:false},
    IdCategorie: { // Clé étrangère
        type: DataTypes.INTEGER,
        references: {
            model: Categorie,     // Référence le modèle Utilisateur
            key: 'IdCategorie'           // Référence la clé primaire `idUtilisateur` dans Utilisateur
        },
    },
},
{ timestamps: false}, //Ne pas avoir les colonnes createdAt and updatedAt automatiquement

);

export default Produits;