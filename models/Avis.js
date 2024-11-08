import database  from "../Connexion.js";
import { DataTypes } from "sequelize"; 

const Avis =database.define ('Avis',{
IdAvis: {type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true,},
Note: {type:DataTypes.STRING, allowNull:true},
Commentaire:{type:DataTypes.STRING, allowNull:true},
DateAvis:{type:DataTypes.DATE, allowNull:False},

IdProduits:{
type:DataTypes.INTEGER,
references:{
    references: {
        model: Produits,     // Référence le modèle Utilisateur
        key: 'IdProduits'           // Référence la clé primaire `idUtilisateur` dans Utilisateur
}
}

},
IdUtilisateurs:{
    type:DataTypes.INTEGER,
references:{
    references:{
        model:Utilisateurs,
        key:'IdUtilisateurs'
    }
}
}

},
{ timestamps: false}
);

export default Avis;

