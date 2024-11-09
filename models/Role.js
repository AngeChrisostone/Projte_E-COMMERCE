import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Role = database.define('Role', {
    IdRole: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NomRole: DataTypes.STRING
}, { timestamps: false });

export default Role;
