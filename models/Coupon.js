import database from "../Connexion.js";
import { DataTypes } from 'sequelize';
const Coupon = database.define('Coupon', {
    IdCoupon: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    Code: { type: DataTypes.STRING, allowNull: false },
    Reduction: { type: DataTypes.DECIMAL, allowNull: false },
    DateExpiration: { type: DataTypes.DATEONLY, allowNull: false },
}, { timestamps: false });

export default Coupon;


