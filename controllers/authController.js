import { request, response } from "express";
import jsonwebtoken from "jsonwebtoken";
import {
  generateRefreshToken,
  generateToken,
} from "../helpers/token-manager.js";
import { User } from "../models/user.js";

export const registerAction = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await User.findOne({ email });
    // Custom error
    if (usuario) throw { code: 11000 };

    // crear usuario
    usuario = new User({ email, password });
    await usuario.save();

    // Crear JWT para devolverlo
    const uid = usuario._id;
    const { token, expiresIn } = await generateToken(uid);

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente.",
      token,
      expiresIn,
    });
    // }
  } catch (error) {
    console.log(error);

    // error por defecto moongoose
    if (error.code === 11000) {
      return res.status(400).json({
        code: error.code,
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
  try {
    const { email, password } = req.body;

    let usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no identificado",
      });
    }

    //validar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Ups!, tu cuenta no esta activa, por favor contacta con el area correspondiente para la reactivación",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Ups!, tu cuenta no esta activa, por favor contacta con el area correspondiente para la reactivación",
      });
    }

    const validPassword = await usuario.comparePassword(password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario y/o Password no son correctos",
      });
    }

    // Generar el JWT
    const uid = usuario._id;
    const { token, expiresIn } = await generateToken(uid);

    // Generamos y guardamos el refresh token en una cookie
    generateRefreshToken(uid, res);

    res.status(200).json({
      ok: true,
      token,
      expiresIn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      msg: "Error de servidor",
    });
  }
};

export const refreshTokenAction = (req = request, res = response) => {
  try { 
    const { token, expiresIn } = generateToken(req.uid);
    res.status(200).json({
      ok: true,
      token,
      expiresIn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error de servidor",
    });
  }
};

export const logoutAction = (req = request, res = response) => {
  res.clearCookie("refreshToken"); // limpiamos la cookie
  res.json({ ok: true });
};
