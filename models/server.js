// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "../database/dbConnectionConfig.js";
import { authRouter } from "../routes/authRouter.js";
import { testRouter } from "../routes/testRouter.js";
import { linkRouter } from "../routes/linkRouter.js";

dotenv.config();

class Server {
  constructor() {
    this.app = express(); //creamos la aplicación de express
    this.port = process.env.PORT || 5000;
    this.authPath = "/api/v1/auth";
    this.testPath = "/api/v1/test";
    this.linkPath = "/api/v1/links";

    //Conectar a base de datos
    this.ConectarDB();

    // Middleware
    this.Middleware();

    //Rutas de mi aplicación
    this.routes();
  }

  // Conectarse a la base de datos
  async ConectarDB() {
    await dbConnection();
  }

  Middleware() {
    //CORS
    this.app.use(cors());

    // Leer las cookies delñ naveagdor
    this.app.use(cookieParser());

    // parseo y lectura del body
    this.app.use(express.json());

    //Servir carpeta publica
    this.app.use(express.static("public"));
  }

  routes() {
    //rutas separadas
    this.app.use(this.authPath, authRouter);
    this.app.use(this.testPath, testRouter);
    this.app.use(this.linkPath, linkRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Example app listening on port ${this.port}, Link: http://localhost:${this.port}`
      );
    });
  }
}

export default Server;
