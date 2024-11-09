import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Categorie = database.define('Categorie', {
    IdCategorie: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nom: DataTypes.STRING,
    Description: DataTypes.STRING
}, { timestamps: false });

export default Categorie;
