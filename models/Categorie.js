import database  from "../Connexion.js";
import { DataTypes } from "sequelize"; 

const Categorie =database.define ('Categorie',{
    IdCategorie: {type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true,},
    DateCom:{type:DataTypes.DATE, allowNull:false},
   StatusCom:{type:DataTypes.STRING, allowNull:False},

   },

{ timestamps: false}
);

export default Categorie;


