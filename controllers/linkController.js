import { request, response } from "express";
import { nanoid } from "nanoid";
import { Link } from "../models/link.js";

export const getAllLinksAction = async (req = request, res = response) => {
  try {
    const user = req.usuario;
    const documents = await Link.find({ uid: user._id });
    res.status(200).json({
      user,
      documents,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const createLinkAction = async (req = request, res = response) => {
  try {
    const user = req.usuario;
    let { longLink, ...body } = req.body;
    if (!longLink.startsWith("https://")) {
      longLink = "https://" + longLink;
    }
    const linkDB = await Link.findOne({ longLink: longLink });
    if (linkDB) {
      return res.status(400).json({
        msg: `El link ${longLink} ya lo has registrado anteriormente`,
      });
    }
    const link = new Link({ longLink, nanoLink: nanoid(6), uid: user._id });
    await link.save();
    res.status(201).json({
      link,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const getLinkByIdAction = async (req = request, res = response) => {
  try {
    const user = req.usuario;
    const { id } = req.params;

    const linkDB = await Link.findById(id);

    if (!linkDB) {
      return res.status(404).json({
        msg: `El link solicitado no existe`,
      });
    }

    // Validar que el recurso pertenezca al usuario
    if (!linkDB.uid.equals(user._id)) {
      return res.status(401).json({
        msg: `Recurso no encontrado`,
      });
    }

    res.status(201).json({
      linkDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const removeLinkByIdAction = async (req = request, res = response) => {
  try {
    const user = req.usuario;
    const { id } = req.params;

    const linkDB = await Link.findById(id);

    if (!linkDB)
      return res.status(404).json({
        msg: `El link solicitado no existe`,
      });

    // Validar que el recurso pertenezca al usuario
    if (!linkDB.uid.equals(user._id))
      return res.status(401).json({
        msg: `Recurso no encontrado`,
      });

    linkDB.remove();

    res.status(201).json({
      linkDB,
    });
    // const producto = await Producto.findByIdAndUpdate(
    //     id,
    //     { estado: false },
    //     { new: true }
    //   )
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const updateLinkAction = (req = request, res = response) => {
  return res.status(201).json({
    ok: true,
    msg: "updateLinkAction",
  });
};
