import { Router } from "express";

import { conductoresGeneral } from '../controllers/conductores.controller.js'

const router = Router()

router.get('/conductores', conductoresGeneral)

export default router