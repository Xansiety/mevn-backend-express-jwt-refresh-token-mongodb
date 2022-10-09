import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  loginAction,
  registerAction,
  refreshTokenAction,
  logoutAction,
} from "../controllers/authController.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("email", "El correo es obligatorio").not().isEmpty(),
    check("email", "El correo no es un formato valido")
      .trim()
      .isEmail()
      .normalizeEmail(),
    check("password", "La contraseña es obligatoria").trim().not().isEmpty(),
    check(
      "password",
      "La contraseña debe ser de minimino 5 caracteres"
    ).isLength({ min: 5 }),
    //   check("password", "La contraseña debe ser de minimino 5 caracteres").custom((password) => emailExiste(password)),
    check("rePassword", "Las Contraseñas no coinciden").custom(
      (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }
    ),
    validarCampos,
  ],
  registerAction
);

authRouter.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  loginAction
);

// Construir refresh Token
authRouter.get("/refresh", [requireRefreshToken], refreshTokenAction);

// Remover las cookies
authRouter.get("/logout", logoutAction);

export { authRouter };
