import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Utilisateurs = database.define('Utilisateurs', {
    IdUtilisateur: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nom: DataTypes.STRING,
    Prenom: DataTypes.STRING,
    Email: DataTypes.STRING,
    MotDePasse: DataTypes.STRING,
    IdRole: DataTypes.INTEGER,
}, { timestamps: false });


export default Utilisateurs;
