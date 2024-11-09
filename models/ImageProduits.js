import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const ImagesProduit = database.define('ImagesProduit', {
    IdImageProduit: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UrlImage: DataTypes.STRING,
    IdProduit: DataTypes.INTEGER
}, { timestamps: false });

export default ImagesProduit;
