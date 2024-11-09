import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const DetailsCommande = database.define('DetailsCommande', {
    IdDetailsCom: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdCommande: DataTypes.INTEGER,
    IdProduit: DataTypes.INTEGER,
    Quantite: DataTypes.INTEGER,
    Prix: DataTypes.DECIMAL
}, { timestamps: false });

export default DetailsCommande;
