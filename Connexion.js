//Connexion à la base de données (connexion.js)
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
// console.log('PORT', dotenv.config())
const ENV = dotenv.config().parsed
const connexion = new Sequelize(ENV.DB_NAME,
ENV.DB_USER, ENV.DB_PASSWORD, {
host: ENV.DB_HOST,
dialect: ENV.DB_DIALECT,
// port:ENV.DB_PORT
});
export default connexion