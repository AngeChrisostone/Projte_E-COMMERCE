import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const ModeDePaiement = database.define('ModeDePaiement', {
    IdModeDePaiement: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NomPaiement: DataTypes.STRING,
    Details: DataTypes.STRING
}, { timestamps: false });

export default ModeDePaiement;
