// Invocamos a la conexion de la DB
import connection from '../db.js';

//==========================================================
// SOLICITUDES PENDIENTES
//==========================================================

// Muestro las solicitudes de los conductores que quieren ingresar por defecto va a traer ingresoCON=0, hablitadoCon=0, estadoCON=0, disponibilidad=0 y motivo(varchar)=NULL ;

export const soliPendiente = (req, res)=>{
    try {
        connection.query(`SELECT placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, habilitadoCON
        FROM Tbl_Conductores
        JOIN Tbl_Conducen ON Tbl_Conducen.idConductorManej = Tbl_Conductores.idConductor
        JOIN Tbl_Vehiculo ON Tbl_Conducen.idVehiculoManej = Tbl_Vehiculo.idVehiculo
        WHERE habilitadoCON = 0;`, async(error, results)=>{
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

// Al presiona al boton RECHAZAR solicitud me van apedir el motivo del por que lo rechazo el conductor por defecto ya viene el null el ingresoCon asi que ese no cambia lo que diferencia a un conductor rechazo o no de TRAMO es el motivo que si no ha sido rechazado tendria el motivo en NULL entonces al rechazar una solicitud lo unico que actualizaria el el motivo que si doy rechazar tendre que dar un motivo y actualizo el NULL por lo ingresado el el modal MOTIVO ;
export const rechazarSoli = async(req, res)=>{
    try {
        const result = await connection.query(`UPDATE tbl_conductor SET ? WHERE id=?`, [
            req.body,
            req.params.id
        ]);
    
        res.json(result)

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

// Al presionar al boton ACEPTAR solicitud voy a actualizar el ingresoCON=1, y el habilidadoCON=1 ;

export const aceptarSoliConductor = async(req, res)=>{
    try {
        const result = await connection.query(`UPDATE conductor SET ? WHERE id=?`, [
            req.body,
            req.params.id
        ]);
    
        res.json(result)

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

//==========================================================
// SOLICITUDES RECHAZADAS
//==========================================================

// Muestro las solicitudes de los conductores que quieren ingresar por defecto va a traer ingresoCON=0, hablitadoCon=0, estadoCON=0, disponibilidad=0 y motivo(varchar)= "RAZON POR LA QUE NO SE ACEPTO EN TRAMO", lleno ;

export const soliRechazada = (req, res)=>{
    try {
        connection.query(`SELECT placaVehiculo, nombreCON, apellidoCON, nroTelefonoCON, nroDocumentoCON, correoElectronicoCON, DireccionResidenciaCON, habilitadoCON
        FROM Tbl_Conductores
        JOIN Tbl_Conducen ON Tbl_Conducen.idConductorManej = Tbl_Conductores.idConductor
        JOIN Tbl_Vehiculo ON Tbl_Conducen.idVehiculoManej = Tbl_Vehiculo.idVehiculo
        WHERE habilitadoCON = 0;`, async(error, results)=>{
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



