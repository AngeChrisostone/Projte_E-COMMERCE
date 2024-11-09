import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Adresse = database.define('Adresse', {
    IdAdresse: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    AdresseLigne: DataTypes.STRING,
    Ville: DataTypes.STRING,
    Province: DataTypes.STRING,
    CodePostal: DataTypes.STRING,
    Pays: DataTypes.STRING,
    IdUtilisateur: DataTypes.INTEGER  // Clé étrangère
}, { timestamps: false });

export default Adresse;
