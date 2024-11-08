import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import mysql from 'promise-mysql'

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:
false }))


import database from '../Projet_E-COMMERCE/Connexion.js'
import './models/Relations.js'

database.sync({ alter: true })
    .then(() => console.log("Les tables ont été mises à jour avec succès"))
    .catch(error => console.error("Erreur lors de la mise à jour des tables :", error));

    app.listen(3000, () => console.log("Serveur lancé sur le port 3000"));