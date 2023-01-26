//Invocamos a bcrypt
import bcryptjs from 'bcryptjs';
// Invocamos a la conexion de la DB
import connection from '../db.js';

// Invocamos los errores de http para el servidor
import createError from 'http-errors'

// CREAR UN NUEVO ADMINISTRADOR TRAMO
export const createAdmin = async (req, res)=>{
    try {
        const email =  req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        let passHaas = await bcryptjs.hash(password, 8);
        
        if(email && name && passHaas){
            connection.query(`INSERT INTO users SET ?`, {email:email, name:name, password:passHaas}, async(error, results)=>{
                if(error){
                    console.log(error)
                }else{
                    res.json("Si se ingreso el dato")
                }
            })
        }else{
            res.json("Por favor ingrese todos los datos")
        }
    } catch (error) {
        createError(404, '!Ups algo anda mal¡')
    }
}


// VALIDAR EL IGRESO AL MODULO ADMINISTRADOR TRAMO
export const autenticacionAdmin = async(req, res)=>{
    try {
        const adminMail = req.body.mailAdmin;
        const adminContra = req.body.passwordAdmin;

        let passHaas = await bcryptjs.hash(adminContra, 8)

        if(adminMail && adminContra){
            connection.query(`SELECT * FROM users WHERE email=?`, [adminMail], async (error , results)=>{
                if(results.length == 0 || !(await bcryptjs.compare(adminContra, results[0].password))){
                    res.json("USUARIO y/o CONTRASEÑA incorrecta");
                }else{
                    req.session.loggedin = true;
                    req.session.name = results[0].name;
                    req.session.email = results[0].email;
                    res.json("Bienvenido administrador TRAMO")
                }
            })
        }else{
            res.json(" ¡Por favor, llene los campos requeridos! ")
        }
    } catch (error) {
        createError(404, '!Ups algo anda mal¡')
    }
}

// CONTROLAR QUE LA SESION ESTE ABIERTA EN TODAS LAS VISTAS DE ADMINBISTRADOR TRAMO

export const controlerAdmin = (req, res)=> {
    try {
        if(req.session.loggedin){
            res.json({
                "login": "true",
                "npmbreAdmin": "req.session.name",
                "CorreoAdmin": "req.session.email"
            });
        }else{
            res.json({
                "login": "false"
            })
        }
    } catch (error) {
        createError(404, '!Ups algo anda mal¡')
    }
}

// CERRAR SESIÓN DEL MODULO ADMINISTRADOR
export const cerraSesion = (req, res)=> {
    try {
        req.session.destroy(()=>{
            res.json({
                "login": "false",
            })
        })
    } catch (error) {
        createError(404, '!Ups algo anda mal¡')
    }
}

