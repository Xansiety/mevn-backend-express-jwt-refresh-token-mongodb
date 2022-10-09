import { request, response } from "express";
import { check, validationResult } from "express-validator";

export const validarCamposExpress = (req = request, res = response, next) => {
  /* Express Validator */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

export const bodyRegisterValidator = [
  check("email", "El correo es obligatorio").not().isEmpty(),
  check("email", "El correo no es un formato valido")
    .trim()
    .isEmail()
    .normalizeEmail(),
  check("password", "La contraseña es obligatoria").trim().not().isEmpty(),
  check("password", "La contraseña debe ser de minimino 5 caracteres").isLength(
    { min: 5 }
  ),
  //   check("password", "La contraseña debe ser de minimino 5 caracteres").custom((password) => emailExiste(password)),
  check("rePassword", "Las Contraseñas no coinciden").custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }
  ),
  validarCamposExpress,
];

export const bodyLoginValidator = [
  check("email", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  validarCamposExpress,
];
