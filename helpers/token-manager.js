import { response } from "express";
import jsonwebtoken from "jsonwebtoken";

export const generateToken = (uid = "") => {
  const payload = { uid };
  const expiresIn = 60 * 15; //15 minutos
  try {
    const token = jsonwebtoken.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res = response) => {
  const expiresIn = 60 * 60 * 24 * 30; //30 dias de duracion
  const expires = new Date(Date.now() + expiresIn * 1000);
  const payload = { uid };
  try {
    const refreshToken = jsonwebtoken.sign(
      payload,
      process.env.SECRETORPRIVATEKEYREFRESH,
      {
        expiresIn,
      }
    );

    // Guardar el token en la cookie del navegador
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.MODO === "developer" ? false : true,
      expires
    });

    return { refreshToken };
    
  } catch (error) {
    console.log(error);
  }
};


export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es valida",
  "jwt expired": "El Token ha expirado",
  "No Bearer": "Token inexistente, utiliza el schema Bearer",
  "jwt must be provided": "Debes proporcionar un token",
  "jwt malformed": "JWT invalido",
};