import { Router } from "express";

import {
    renderIndexPage,
    renderBandaPage,
    renderDiscografiaPage,
    renderMerchPage,
    renderContactoPage,

} from "../controllers/index.controller.js";

const router = Router();

// Ruta a la página principal
router.get("/index", renderIndexPage);

//Ruta a la página de biografía
router.get("/banda", renderBandaPage);

//Ruta a la página discografía
router.get("/discografia", renderDiscografiaPage);

//Ruta a la página de Merchandise
router.get("/merch", renderMerchPage);

//Ruta a la página formulario de contacto
router.get("/contacto", renderContactoPage);


export default router;