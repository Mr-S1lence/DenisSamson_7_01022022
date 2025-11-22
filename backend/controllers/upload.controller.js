// const database = require("../config/db");
// const db = database.getDB();
import { getDB } from "../config/db.js";
const db = getDB();
// const fs = require("fs");
// const { promisify } = require("util");
// const { uploadErrors } = require("../utils/errors.utils");
// const pipeline = promisify(require("stream").pipeline);

import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from 'util';
import { uploadErrors } from '../utils/errors.utils.js';
import { pipeline as streamPipeline } from 'stream';

const pipeline = promisify(streamPipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadController = {
  uploadProfil: async (req, res) => { 
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");
  
      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    const fileName = req.body.name + ".jpg";
  
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../frontend/public/uploads/profil/${fileName}`
      )
    );
  
    const picture = req.file !== null ? "./uploads/profil/" + fileName : "";
  
    try {
      const sql = `UPDATE users SET picture = "${picture}", updatedAt = NOW() WHERE user_id = "${req.body.userId}";`;
      db.query(sql, async (err, result) => {
        if (err == null) {
          res.json(result);
        } else {
          console.log(err);
        }
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
   }
};

export default uploadController;
