import { Router } from "express";

import { conductoresDisponibles, conductoresEnServicio } from '../controllers/conductores.controller.js'

const router = Router()

router.get('/conductoresDis', conductoresDisponibles)

router.get('/conductoresEnServicio', conductoresEnServicio)

// router.get('/unicoConductor/:id', conductoresEnServicio)

// router.delete('/unicoConductor/:id', eliminarconductorEnServicio)

// router.put('/unicoConductor/:id', eliminarconductorEnServicio)

export default router