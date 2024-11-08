import database from "../Connexion.js";
import { DataTypes } from 'sequelize';

const DetailsCommande = database.define('DetailsCommande', {
    IdDetailsCom: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    IdCommandes: { type: DataTypes.INTEGER, allowNull: false, references: { model: Commandes, key: 'IdCommandes' } },
    IdProduits: { type: DataTypes.INTEGER, allowNull: false, references: { model: Produits, key: 'IdProduits' } },
    Quantite: { type: DataTypes.INTEGER, allowNull: false },
    Prix: { type: DataTypes.DECIMAL, allowNull: false },
}, { timestamps: false });


export default DetailsCommande;

