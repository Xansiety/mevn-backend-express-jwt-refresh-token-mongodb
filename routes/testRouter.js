import { Router } from "express";
import { protectedAction } from "../controllers/testController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarToken } from "../middlewares/requireToken.js";

const testRouter = Router();

testRouter.get("/protected", [validarToken, validarCampos], protectedAction);

export { testRouter };
