// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from "dotenv" 
import express from "express"
import cors from "cors"
import { dbConnection } from "../database/dbConnectionConfig.js"
import { authRouter } from "../routes/authRouter.js"

dotenv.config()

class Server {
  constructor() {
    this.app = express() //creamos la aplicación de express
    this.port = process.env.PORT || 5000
    this.usuariosPath = "/api/v1"

    //Conectar a base de datos
    this.ConectarDB()
     
    // Middleware
    this.Middleware()

    //Rutas de mi aplicación
    this.routes()
  }

  // Conectarse a la base de datos
  async ConectarDB() {
    await dbConnection()
  }


  Middleware() {
    //CORS
    this.app.use(cors())

    // parseo y lectura del body
    this.app.use(express.json())
 
  }

  routes() {
    //rutas separadas
    this.app.use(this.usuariosPath, authRouter)
    
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}, Link: http://localhost:${this.port}`)
    })
  }
}

export default Server