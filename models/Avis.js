import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Avis = database.define('Avis', {
    IdAvis: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Note: DataTypes.STRING,
    Commentaire: DataTypes.STRING,
    DateAvis: DataTypes.DATE,
    IdProduit: DataTypes.INTEGER,  // Clé étrangère
    IdUtilisateur: DataTypes.INTEGER  // Clé étrangère
}, { timestamps: false });

export default Avis;
