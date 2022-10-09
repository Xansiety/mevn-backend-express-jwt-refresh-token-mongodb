import { request, response } from "express"
import { validationResult } from "express-validator"

export const validarCamposExpress = (req = request, res = response, next) => {
  /* Express Validator */
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  } 
  next()
}