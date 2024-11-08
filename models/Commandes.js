//Importer la base de données pour créer les modèles 
import database from "../Connexion.js";
import {DataTypes } from 'sequelize'

//Modele de la table Commandes test

const Commandes = database.define('Commande',{
    IdCommandes: { type:DataTypes.INTEGER,allowNull:false, primaryKey: true, autoIncrement: true,},
    DateCom :{type:DataTypes.DATEONLY},
    StatusCom:{type:DataTypes.STRING,allowNull:false},
    IdUtilisateurs: { // Clé étrangère
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateurs,     // Référence le modèle Utilisateur
            key: 'IdUtilisateurs'           // Référence la clé primaire `idUtilisateur` dans Utilisateur
        },
    },
    IdCoupon: { // Clé étrangère
        type: DataTypes.INTEGER,
        references: {
            model: Coupon,     // Référence le modèle Utilisateur
            key: 'IdCoupon'           // Référence la clé primaire `idUtilisateur` dans Utilisateur
        },
    },
    IdModePaiement: { // Clé étrangère
        type: DataTypes.INTEGER,
        references: {
            model: ModePaiement,     // Référence le modèle Utilisateur
            key: 'IdModePaiement'           // Référence la clé primaire `idUtilisateur` dans Utilisateur
        },
    },
},
{ timestamps: false}, //Ne pas avoir les colonnes createdAt and updatedAt automatiquement
);

export default Commandes;