import express from "express";

// rutas LOGIN
import loginRoutes from './routes/login.routes.js'

// rutas CONDUCTORES
import conductoresRoutes from './routes/conductores.routes.js'

// rutas SOLICITUDES CONDUCTORES
import soliConductoresRoutes from './routes/soliConductores.routes.js'

import datosConductores from './routes/datosConductores.routes.js'

const app = express()

//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//variables de session
import session from 'express-session';
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(loginRoutes)

app.use('/admin', conductoresRoutes)

app.use('/admin', soliConductoresRoutes)

app.use('/admin', datosConductores)

export default app

 
