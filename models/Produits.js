import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Produits = database.define('Produits', {
    IdProduit: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NomProduit: DataTypes.STRING,
    DescriptionProd: DataTypes.STRING,
    PrixProd: DataTypes.FLOAT,
    StockProd: DataTypes.INTEGER,
    IdCategorie: DataTypes.INTEGER
}, { timestamps: false });

export default Produits;
