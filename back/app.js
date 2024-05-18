// Importation des modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Création de l'application Express
const app = express();
app.use(cors());

// Importation des routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin"); // Importer la route admin

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Utilisation des routes spécifiques
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes); // Utiliser la route admin

// Exportation de l'application Express
module.exports = app;
