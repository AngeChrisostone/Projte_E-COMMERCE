import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const PanierProduits = database.define('PanierProduits', {
    IdPanier: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    IdProduit: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    Quantite: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, { timestamps: false });

export default PanierProduits;
