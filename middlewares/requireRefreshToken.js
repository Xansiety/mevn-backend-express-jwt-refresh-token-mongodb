import { request, response } from "express";
import { tokenVerificationErrors } from "../helpers/token-manager.js";
import jsonwebtoken from 'jsonwebtoken'
export const requireRefreshToken = (req = request, res = response, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error("No existe el token");

    const { uid } = jsonwebtoken.verify(
      refreshToken,
      process.env.SECRETORPRIVATEKEYREFRESH
    ); 

    req.uid = uid // agremos la data a la request
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: tokenVerificationErrors[error.message] });
  }
};
