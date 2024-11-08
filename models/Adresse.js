//Importer la base de données pour créer les modèles 
import database from "../Connexion.js";
import {DataTypes } from 'sequelize'


//Modele de la table Adresse

const Adresse = database.define('Adresse',{
    IdAdresse: { type:DataTypes.INTEGER,allowNull:false, primaryKey: true, autoIncrement: true,},
    AdresseLigne :{ type:DataTypes.STRING,allowNull:false},
    Ville:{type:DataTypes.STRING,allowNull:false},
    Province:{type:DataTypes.STRING,allowNull:false},
    CodePostal:{type:DataTypes.STRING,allowNull:false},
    Pays:{type:DataTypes.STRING,allowNull:false},
    idUtilisateur: { // Clé étrangère
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,     // Référence le modèle Utilisateur
            key: 'idUtilisateur'           // Référence la clé primaire `idUtilisateur` dans Utilisateur
        },
    },
},
{ timestamps: false}, //Ne pas avoir les colonnes createdAt and updatedAt automatiquement
);

export default Adresse;
