import { Router } from "express";
import { protectedAction } from "../controllers/testController.js";
import { validarCamposExpress } from "../middlewares/validatorManager.js";
import { validarToken } from "../middlewares/requireToken.js";

const testRouter = Router();

testRouter.get("/protected", [validarToken, validarCamposExpress], protectedAction);

export { testRouter };
