import { Router } from "express";
import { protectedAction } from "../controllers/testController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const testRouter = Router();

testRouter.get("/protected", [validarJWT, validarCampos], protectedAction);

export { testRouter };
