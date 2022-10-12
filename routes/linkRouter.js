import { Router } from "express";
import { linkgetAction } from "../controllers/linkController.js";
 
const linkRouter = Router();

// Ruta de registro
linkRouter.get("/", linkgetAction);
 

export { linkRouter };
