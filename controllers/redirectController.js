import { request, response } from "express";
import { Link } from "../models/link.js";

export const searchLink = async (req = request, res = response) => {
  try {
    const { nanoLink } = req.params;

    const linkDB = await Link.findOne({ nanoLink });

    if (!linkDB) {
      return res.status(404).json({
        msg: `El link solicitado no existe`,
      });
    }
    res.status(201).json({
      longLink: linkDB.longLink,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const redirectToLink = async (req = request, res = response) => {
  try {
    const { nanoLink } = req.params;

    const linkDB = await Link.findOne({ nanoLink });

    if (!linkDB) {
      return res.status(404).json({
        msg: `El link solicitado no existe`,
      });
    }
    return res.redirect(linkDB.longLink);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};
