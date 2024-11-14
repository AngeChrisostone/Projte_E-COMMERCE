import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const ImageProduits = database.define('ImageProduits', {
    IdImageProduit: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UrlImage: DataTypes.STRING,
    IdProduit: DataTypes.INTEGER
}, { timestamps: false });

export default ImageProduits;
