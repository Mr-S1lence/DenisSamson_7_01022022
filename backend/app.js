import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { getDB } from "./config/db.js";
const db = getDB();

import authMiddleware from "./middleware/auth.middleware.js";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import dotenv from "dotenv";
dotenv.config();

// Connexion bdd
console.log("Get connection ...");

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

const app = express();

// --- CORS pour Vite ---
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- Permissions-Policy pour supprimer le warning "accelerometer" ---
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()" // fonctionnalités supportées
  );
  next();
});

// JWT
app.get("*", authMiddleware.checkUser);
app.get("/jwtid", authMiddleware.requireAuth, (req, res) => {
  res.status(200).send(res.locals.user);
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

export default app;
