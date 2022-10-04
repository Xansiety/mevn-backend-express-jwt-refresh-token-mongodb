import { request, response } from "express";
import { User } from "../models/user.js";

export const registerAction = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await User.findOne({ email });

    // Custom error
    if (usuario) {
      return res.status(400).json({
        code: 11000,
        msg: "Usuario ya se encuentra registrado",
      });
    } 
    // crear usuario
    usuario = new User({ email, password });
    await usuario.save();

    // Crear JWT para devolverlo 
    return res.status(201).json({
      msg: "Usuario creado correctamente.",
    });
    // }
  } catch (error) {
    console.log(error);

    // error por defecto moongoose
    if (error.code === 11000) {
      return res.status(400).json({
        code: 11000,
        msg: "Usuario ya se encuentra registrado",
      });
    }

    return res.status(500).json({
      code: 500,
      msg: "Error de servidor",
    });

  }
};

export const loginAction = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    action: "Login",
  });
};
