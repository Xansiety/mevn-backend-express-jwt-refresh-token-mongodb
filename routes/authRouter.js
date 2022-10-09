import { Router } from "express";
import { check } from "express-validator";
import { validarCamposExpress } from "../middlewares/validar-campos.js";
import {
  loginAction,
  registerAction,
  refreshTokenAction,
  logoutAction,
} from "../controllers/authController.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const authRouter = Router();

// Ruta de registro
authRouter.post("/register", [bodyRegisterValidator], registerAction);

// Ruta de login
authRouter.post("/login", [bodyLoginValidator], loginAction);

// Construir refresh Token
authRouter.get("/refresh", [requireRefreshToken], refreshTokenAction);

// Remover las cookies
authRouter.get("/logout", logoutAction);

export { authRouter };
