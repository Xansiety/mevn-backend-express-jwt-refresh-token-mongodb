import { request, response } from "express";

export const linkgetAction = (req = request, res = response) => {
  
  return res.status(201).json({
    ok: true,
    msg: "linkgetAction", 
  });
};


