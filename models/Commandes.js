import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Commandes = database.define('Commandes', {
    IdCommande: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    DateCom: DataTypes.DATE,
    StatusCom: DataTypes.STRING,
    IdUtilisateur: DataTypes.INTEGER,
    IdCoupon: DataTypes.INTEGER,
    IdModeDePaiement: DataTypes.INTEGER
}, { timestamps: false });

export default Commandes;
