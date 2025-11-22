//const express = require("express");
import express from "express";
//const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
//const database = require("./config/db");
import cors from "cors";

import { getDB } from "./config/db.js";
const db = getDB();
//const { requireAuth, checkUser } = require("./middleware/auth.middleware");
import authMiddleware from './middleware/auth.middleware.js';

/* const stuffRoutes = require('./routes/stuff'); */
//const userRoutes = require("./routes/user.routes");
import userRoutes from "./routes/user.routes.js";
//const postRoutes = require("./routes/post.routes");
import postRoutes from "./routes/post.routes.js";
//const commentRoutes = require("./routes/comment.routes");
import commentRoutes from "./routes/comment.routes.js";
import dotenv from "dotenv";

dotenv.config(); // charge le .env

//connexion bdd
console.log("Get connection ...");
// const db = database.getDB();

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

const app = express();

/* CORS signifie « Cross Origin Resource Sharing ». 
Il s'agit d'un système de sécurité qui, par défaut, 
bloque les appels HTTP entre des serveurs différents, 
ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles */
// --- CORS pour Vite frontend ---
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Port Vite par défaut
  credentials: true,
}));

// app.use((req, res, next) => {
//   const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
//   res.setHeader("Access-Control-Allow-Origin", clientUrl);
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });


// Middleware CORS
app.use(express.json()); //Permet d'accèder au corps de la requête.
//Intercepte toutes les requêtes contentType json et nous le mets à disposition dans req.body.
//Anciennement body-parser

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt
// Vérification de l'utilisateur sur **toutes les routes** avec middleware
// app.use(authMiddleware.checkUser);

// Route spécifique pour récupérer le JWT
// app.get("/jwtid", authMiddleware.requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user);
// });

app.get("*", authMiddleware.checkUser); 
app.get("/jwtid", authMiddleware.requireAuth, (req, res) => {
  res.status(200).send(res.locals.user);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

//module.exports = app;
export default app;
