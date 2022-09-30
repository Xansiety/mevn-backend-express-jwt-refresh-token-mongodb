import { request, response } from "express";
import User from "../models/user.js";

export const registerAction = async (req = request, res = response) => {

    const body = req.body
  res.status(200).json({
    ok: true,
    action: "Register",
    body
  });
};

export const loginAction = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    action: "Login",
  });
};
