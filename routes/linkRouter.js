import { Router } from "express";
import {
  getAllLinksAction,
  getLinkByIdAction,
  createLinkAction,
  removeLinkByIdAction,
  patchLinkAction,
} from "../controllers/linkController.js";
import { validarToken } from "../middlewares/requireToken.js";
import {
  bodyLinkIdValidator,
  bodyLinkValidator,
  paramsLinkValidator,
} from "../middlewares/validatorManager.js";

const linkRouter = Router();

// mostrar todos los links
linkRouter.get("/", [validarToken], getAllLinksAction);

// mostrar un link en especifico
linkRouter.get(
  "/:id",
  [validarToken, paramsLinkValidator, bodyLinkIdValidator],
  getLinkByIdAction
);

// Crear un nuevo link
linkRouter.post("/", [validarToken, bodyLinkValidator], createLinkAction);

// Actualizar un link
linkRouter.patch(
  "/:id",
  [validarToken, paramsLinkValidator, bodyLinkIdValidator, bodyLinkValidator],
  patchLinkAction
);

// Remover un link
linkRouter.delete(
  "/:id",
  [validarToken, paramsLinkValidator, bodyLinkIdValidator],
  removeLinkByIdAction
);
export { linkRouter };
