import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } = process.env;

const connexion = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
    logging: false, // Désactiver le logging de Sequelize
});

connexion.authenticate()
    .then(() => console.log("Connexion à la base de données réussie"))
    .catch(error => console.error("Erreur de connexion à la base de données :", error));

export default connexion;
