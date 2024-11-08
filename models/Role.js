import { DataTypes } from 'sequelize';

import database from '../Connexion.js';



// Définition du modèle Role

const Role = database.define('Role', {

  IdRole: {

    type: DataTypes.INTEGER,

    primaryKey: true,

    autoIncrement: true,

  },

  NomRole: {

    type: DataTypes.STRING,

    allowNull: false,

  },

}, {

  timestamps: false  // Ne pas inclure createdAt et updatedAt

});

export default Role;

