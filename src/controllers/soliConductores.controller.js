// Invocamos a la conexion de la DB
import connection from '../db.js';

// Invocamos los errores de http para el servidor
import createError from 'http-errors'

export const soliGeneral = (req, res)=>{
    res.json("Hola solicitudes Conductores")
}