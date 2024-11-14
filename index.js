import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import database from './Connexion.js';
import './models/Relations.js';
import routes from './Routes/index.js';

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Utiliser les routes avec un préfixe /api
app.use('/', routes);

// Synchroniser la base de données et démarrer le serveur
database.sync({ alter: true })
    .then(() => console.log("Les tables ont été mises à jour avec succès"))
    .catch(error => console.error("Erreur lors de la mise à jour des tables :", error));

app.listen(5000, () => console.log("Serveur lancé sur le port 5000"));