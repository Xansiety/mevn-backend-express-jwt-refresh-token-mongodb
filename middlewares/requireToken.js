import { request, response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { tokenVerificationErrors } from "../helpers/token-manager.js";
import { User } from "../models/user.js";
 
// leer jwt desde un header
export const validarToken = async (req = request, res = response, next) => {
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
    req.usuario = { _id, email };

    // Continuamos
    next();
  } catch (error) {
    console.log(error.message);
  
    res.status(401).json({
      error: tokenVerificationErrors[error.message],
    });
  }
};



// // leer JWT desde cookie
// export const validarJWT = async (req = request, res = response, next) => {
//   try {
//     //obtener el JWT desde los headers
//     let token = req.cookies.cookieToken;
//     console.log({token})

//     if (!token) throw new Error("No token"); 

//     //verificar el token
//     const { uid } = jsonwebtoken.verify(token, process.env.SECRETORPRIVATEKEY);

//     //leer el usuario por uid
//     //.lean() -> consultas
//     const { _id, email, estado } = await User.findById(uid).lean();

//     //validar que el usuario no exista
//     if (!_id) {
//       return res.status(401).json({
//         error: "El usuario que intenta realizar la petición no existe",
//       });
//     }

//     // validar si el usuario esta activo
//     if (!estado) {
//       return res
//         .status(401)
//         .json({ error: "Token no valido -> usuario inactivo" });
//     }

//     // añadimos el usuario a la req, para que podamos acceder a el desde el controller
//     req.usuario = { _id, email };

//     // Continuamos
//     next();
//   } catch (error) {
//     console.log(error.message);

//     const tokenVerificationErrors = {
//       "invalid signature": "La firma del JWT no es valida",
//       "jwt expired": "El Token ha expirado",
//       "No token": "Token inexistente",
//       "jwt must be provided": "Debes proporcionar un token",
//       "jwt malformed": "JWT invalido",
//     };

//     res.status(401).json({
//       error: tokenVerificationErrors[error.message],
//     });
//   }
// };
