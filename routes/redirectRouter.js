import { Router } from "express"; 
import { redirectToLink, searchLink } from "../controllers/redirectController.js";

const redirectRouter = Router();

redirectRouter.get("/search/:nanoLink", searchLink);
redirectRouter.get("/:nanoLink", redirectToLink );

export { redirectRouter };
