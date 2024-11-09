import { DataTypes } from 'sequelize';
import database from '../Connexion.js';

const Coupon = database.define('Coupon', {
    IdCoupon: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Code: DataTypes.STRING,
    Reduction: DataTypes.DECIMAL,
    DateExpiration: DataTypes.DATEONLY
}, { timestamps: false });

export default Coupon;
