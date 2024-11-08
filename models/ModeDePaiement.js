import database  from "../Connexion.js";
import { DataTypes } from "sequelize"; 
const ModeDePaiement =database.define ('ModeDePaiement',{
    IdModeDePaiement: {type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true,},
    NomPaiement:{type:DataTypes.STRING, allowNull:true},
    Details:{type:DataTypes.DATE, allowNull:false},

},

{ timestamps: false}
);

export default ModeDePaiement;


