import { Router } from "express";
import { conductorHabilitado, conductorInhabilitado } from '../controllers/datosConductores.controller.js'

const router = Router()

//==========================================================
// CONDUCTORES HABILITADOS
//==========================================================

router.get('/datosConductoresHabilitados', conductorHabilitado);

//==========================================================
// CONDUCTORES INHABILITADOS
//==========================================================

router.get('/datosConductoresInhabilitados', conductorInhabilitado);

export default router