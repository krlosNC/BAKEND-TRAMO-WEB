import { Router } from "express";

import { soliGeneral } from "../controllers/soliConductores.controller.js"

const router = Router();

router.get('/solicitudes', soliGeneral)

export default router