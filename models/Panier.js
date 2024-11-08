// Importer sequelize et DataTypes

import { DataTypes } from 'sequelize';

import database from '../Connexion.js';



// Définition du modèle Panier

const Panier = database.define('Panier', {

  idPanier: {

    type: DataTypes.INTEGER,

    primaryKey: true,

    autoIncrement: true,

  },

  quantite: {

    type: DataTypes.INTEGER,

    defaultValue: 1,

  },

  idUtilisateur: {  // Clé étrangère vers Utilisateur

    type: DataTypes.INTEGER,

    references: {

      model: Utilisateur,

      key: 'idUtilisateur'

    },

  },

  idProduit: {  // Clé étrangère vers Produits

    type: DataTypes.INTEGER,

    references: {

      model: Produits,

      key: 'idProduit'

    },

  },

}, {

  timestamps: false  // Ne pas inclure createdAt et updatedAt

});


export default Panier;
