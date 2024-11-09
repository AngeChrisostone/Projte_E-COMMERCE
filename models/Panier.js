import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Panier = database.define('Panier', {
    IdPanier: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdUtilisateur: DataTypes.INTEGER
}, { timestamps: false });

export default Panier;
