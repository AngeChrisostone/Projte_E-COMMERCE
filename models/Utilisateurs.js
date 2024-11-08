import { DataTypes } from 'sequelize';

import database from '../Connexion.js';
          



// Définition du modèle Utilisateur

const Utilisateurs = database.define('Utilisateurs', {

  IdUtilisateurs: {

    type: DataTypes.INTEGER,

    primaryKey: true,

    autoIncrement: true,

  },

  Nom: {

    type: DataTypes.STRING,

    allowNull: false,

  },

  Prenom: {

    type: DataTypes.STRING,

    allowNull: false,

  },

  Email: {

    type: DataTypes.STRING,

    allowNull: false,

    unique: true,

  },

  MotDePasse: {

    type: DataTypes.STRING,

    allowNull: false,

  },

  IdRole: {

    type: DataTypes.INTEGER,

    allowNull: false,

  },

}, {

  timestamps: false,  // Ne pas inclure createdAt et updatedAt

});

export default Utilisateurs;
