// Invocamos a la conexion de la DB
import connection from '../db.js';

export const conductoresDisponibles = (req, res)=>{

    try {
        connection.query(`SELECT placaVehiculo, nombreCON, nroTelefonoCON, calificacionCON, habilitadoCON, estadoCON, disponibilidadCON
        FROM Tbl_Conductores
        JOIN Tbl_Conducen ON Tbl_Conducen.idConductorManej = Tbl_Conductores.idConductor
        JOIN Tbl_Vehiculo ON Tbl_Conducen.idVehiculoManej = Tbl_Vehiculo.idVehiculo
        WHERE habilitadoCON = 1 AND estadoCON = 1 AND disponibilidadCON = 1;`, async(error, results)=>{
        if(error){
            console.log(error)
        }else{
            res.json(results)
        }
    })
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

export const conductoresEnServicio = (req, res)=>{

    try {
        connection.query(`SELECT placaVehiculo, nombreCON, nroTelefonoCON, calificacionCON, habilitadoCON, estadoCON, disponibilidadCON
        FROM Tbl_Conductores
        JOIN Tbl_Conducen ON Tbl_Conducen.idConductorManej = Tbl_Conductores.idConductor
        JOIN Tbl_Vehiculo ON Tbl_Conducen.idVehiculoManej = Tbl_Vehiculo.idVehiculo
        WHERE  habilitadoCON = 1 AND estadoCON = 1 AND disponibilidadCON = 0;`, async(error, results)=>{
        if(error){
            console.log(error)
        }else{
            res.json(results)
        }
    })
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}


/* 
    para traer un unico condcutor en una consulta

    export const conductorEnServicio = async(req, res)=>{
        const [result] = await connection.query(`SELECT * FROM conductor WHERE id=?`, [req.params.id]);

        if(result.length === 0)
        return res.status(404).json({
            message: "No se encontro este conductor"
        })

        res.json(result[0])
    }


    para Eliminar un unico condcutor en una consulta

    export const eliminarconductorEnServicio = async(req, res)=>{
        const [result] = await connection.query(`DELETE FROM conductor WHERE id=?`, [req.params.id]);

        if(result.affectedRoes === 0)
        return res.status(404).json({
            message: "No se encontro este conductor a eliminar"
        })

        return res.sendStatus(204)
    }

    para actualizar un unico condcutor en una consulta

    export const actualizarconductorEnServicio = async(req, res)=>{
        const result = await connection.query(`UPDATE conductor SET ? WHERE id=`, [
            req.body,
            req.params.id
        ]);

        res.json(result)
    }
    
 */


