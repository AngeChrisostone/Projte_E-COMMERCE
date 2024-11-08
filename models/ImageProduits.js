import database from "../Connexion.js";
import { DataTypes } from 'sequelize';
const ImagesProduit = database.define('ImagesProduit', {
    IdImagesProd: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    IdProduits: { type: DataTypes.INTEGER, allowNull: false, references: { model: Produits, key: 'IdProduits' } },
    UrlImage: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

export default ImagesProduit;

