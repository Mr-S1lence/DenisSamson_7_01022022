const express = require("express");
const cookieParser = require("cookie-parser");
const database = require("./config/db");
const { requireAuth, checkUser } = require("./middleware/auth.middleware");

/* const stuffRoutes = require('./routes/stuff'); */
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

//connexion bdd
console.log("Get connection ...");
const db = database.getDB();

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

const app = express();

/* CORS signifie « Cross Origin Resource Sharing ». 
Il s'agit d'un système de sécurité qui, par défaut, 
bloque les appels HTTP entre des serveurs différents, 
ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json()); //Permet d'accèder au corps de la requête.
//Intercepte toutes les requêtes contentType json et nous le mets à disposition dans req.body.
//Anciennement body-parser

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
