import { request, response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/user.js";

export const validarJWT = async (req = request, res = response, next) => {
  try {
    //obtener el JWT desde los headers
    let token = req.headers?.authorization;

    if (!token) throw new Error("No Bearer");

    // Separamos el Bearer de nuestro token
    token = token.split(" ")[1];

    //verificar el token
    const { uid } = jsonwebtoken.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario por uid
    //.lean() -> consultas
    const { _id, email, estado } = await User.findById(uid).lean();

    //validar que el usuario no exista
    if (!_id) {
      return res.status(401).json({
        error: "El usuario que intenta realizar la petición no existe",
      });
    }

    // validar si el usuario esta activo
    if (!estado) {
      return res
        .status(401)
        .json({ error: "Token no valido -> usuario inactivo" });
    }

    // añadimos el usuario a la req, para que podamos acceder a el desde el controller
    req.usuario = { _id, email, estado };

    // Continuamos
    next();
  } catch (error) {
    console.log(error.message);

    const tokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es valida",
      "jwt expired": "El Token a expirado",
      "No Bearer": "Token inexistente, utiliza el schema Bearer",
    };

    res.status(401).json({
      error: tokenVerificationErrors[error.message],
    });
  }
};
