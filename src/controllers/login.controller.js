//Invocamos a bcrypt
import bcryptjs from 'bcryptjs';
// Invocamos a la conexion de la DB
import connection from '../db.js';


// CREAR UN NUEVO ADMINISTRADOR TRAMO
export const createAdmin = async (req, res)=>{
    try {
        const usuario = req.body.usuario;
        const password = req.body.password;
        let passHaas = await bcryptjs.hash(password, 8);
        
        if(usuario && passHaas){
            connection.query(`INSERT INTO tbl_administradores SET ?`, {Usuario:usuario, Contraseña:passHaas}, async(error, results)=>{
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
        return res.status(500).json({ message: error.message})
    }
}


// VALIDAR EL IGRESO AL MODULO ADMINISTRADOR TRAMO
export const autenticacionAdmin = async(req, res)=>{
    try {
        const usuarioAdmin = req.body.usuarioAdmin;
        const adminContra = req.body.passwordAdmin;

        let passHaas = await bcryptjs.hash(adminContra, 8)

        if(usuarioAdmin && adminContra){
            connection.query(`SELECT * FROM tbl_administradores WHERE Usuario=?`, [usuarioAdmin], async (error , results)=>{
                if(results.length == 0 || !(await bcryptjs.compare(adminContra, results[0].Contraseña))){
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
        return res.status(500).json({ message: error.message})
    }
}

// CONTROLAR QUE LA SESION ESTE ABIERTA EN TODAS LAS VISTAS DE ADMINBISTRADOR TRAMO

export const controlerAdmin = (req, res)=> {
    try {
        if(req.session.loggedin){
            res.json({
                "login": "true",
                "nombreAdmin": "req.session.name",
                "CorreoAdmin": "req.session.email"
            });
        }else{
            res.json({
                "login": "false"
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message})
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
        return res.status(500).json({ message: error.message})
    }
}

