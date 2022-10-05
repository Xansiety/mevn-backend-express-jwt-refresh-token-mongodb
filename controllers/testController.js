import { request, response } from "express";

export const protectedAction = (req = request, res = response) => {
  const user = req.usuario; // agregamos esta propiedad desde el middleware de validacion de JWT 
  return res.status(201).json({
    ok: true,
    msg: "testjwt",
    user,
  });
};


