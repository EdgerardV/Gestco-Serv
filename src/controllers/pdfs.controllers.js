// Database
const pool = require('../db.js');

// PDF
const personalPDF = require('../utils/PDF/personalPDF.js')
const equiposPDF = require('../utils/PDF/equiposPDF.js')
const solicitudesEquipoPDF = require('../utils/PDF/solicitudesEquipoPDF.js')
const solicitudesMantenimientoPDF = require('../utils/PDF/solicitudesMantenimientoPDF.js')
const bitacoraCTCsPDF = require('../utils/PDF/bitacoraCTCsPDF.js')

// Utils
const getFechaString = require('../utils/fecha.js')

const get_Personal_PDF = async(req,res,next) => {
	try{
		const result = await pool.query(`
		SELECT "idPersonal",
				nombres,
				"apellidoP",
				"apellidoM",
				"Departamentos"."departamento",
				"Puestos"."puesto",
				"noEmpleado"
			FROM "Personal"
			inner join "Departamentos"
				on "Personal"."idDepartamento" = "Departamentos"."idDepartamento"
			inner join "Puestos"
				on "Personal"."idPuesto" = "Puestos"."idPuesto";
		`);
		let contentDisposition = `attachment;filename=personal (${getFechaString()}).pdf`
		const stream = res.writeHead(200,{
			'Content-Type' : 'application/pdf',
			'Content-Disposition' : contentDisposition
		});

		await personalPDF.buildPDF(
			(chunk) => stream.write(chunk),
			() => stream.end(),
			result.rows
		)
	}catch(error){
		next(error)
	}
}

const get_Equipos_PDF = async(req,res,next) => {
	try{		
		const equipos = await pool.query(`
			SELECT "idEncargado",
				"Encargados"."idEquipo",
				"Personal"."nombres",
				"Personal"."apellidoP",
				"Personal"."apellidoM",
				"Modelos"."descripcion",
				"Modelos"."marca",
				"Modelos"."modelo",
				"Departamentos"."departamento",
				"Puestos"."puesto"
					from "Encargados"
						inner join "Personal" 
							on "Encargados"."idPersonal" = "Personal"."idPersonal"
						inner join "Dispositivos"
							on "Encargados"."idEquipo" = "Dispositivos"."idEquipo"
						inner join "Modelos"
							on "Dispositivos"."idModelo" = "Modelos"."idModelo"
						inner join "Equipos"
							on "Encargados"."idEquipo" = "Equipos"."idEquipo"
						inner join "Departamentos"
							on "Equipos"."idDepartamento" = "Departamentos"."idDepartamento" 
						inner join "Puestos"
							on "Equipos"."idPuesto" = "Puestos"."idPuesto" 
		`);

		let contentDisposition = `attachment;filename=equipos (${getFechaString()}).pdf`
		const stream = res.writeHead(200,{
			'Content-Type' : 'application/pdf',
			'Content-Disposition' : contentDisposition
		});

		equiposPDF.buildPDF(
			(chunk) => stream.write(chunk),
			() => stream.end(),
			equipos.rows
		)
	}catch(error){
		next(error)
	}
}

const get_SolicitudesEquipo_PDF = async(req,res,next) => {
	try{
		const result = await pool.query(`
			SELECT "idSolicitudesDeEquipo",
				"Personal"."nombres",
				"Personal"."apellidoP",
				"Personal"."apellidoM",
				cantidad,
				descripcion,
				justificacion,
				mes,
				fecha
				FROM public."SolicitudesDeEquipo"
				Inner join "CuentasDeAcceso"
					on "SolicitudesDeEquipo"."idCuentaDeAcceso" = "CuentasDeAcceso"."idCuentaDeAcceso"
				inner join "Personal"
					on "CuentasDeAcceso"."idPersonal" = "Personal"."idPersonal"
				where fecha between $1 and $2;
		`,[req.params.ini, req.params.fin]);

		let contentDisposition = `attachment;filename=solicitudes de equipo (${req.params.ini} - ${req.params.fin}).pdf`
		const stream = res.writeHead(200,{
			'Content-Type' : 'application/pdf',
			'Content-Disposition' : contentDisposition
		});
		solicitudesEquipoPDF.buildPDF(
			(chunk) => stream.write(chunk),
			() => stream.end(),
			result.rows
		)
	}catch(error){
		next(error)
	}
}

const get_SolicitudesMantenimiento_PDF = async(req,res,next) => {
	try{
		const result = await pool.query(`
			SELECT 
				"idInformeMantenimiento",
				"Personal"."nombres",
				"Personal"."apellidoP",
				"Personal"."apellidoM",
				"problema",
				"condicion",
				"descripcion",
				"fecha"
			FROM "InformeMantenimiento"
			inner join "Encargados"
				on "InformeMantenimiento"."idEquipo" = "Encargados"."idEquipo"
			inner join "Personal"
				on "Encargados"."idPersonal" = "Personal"."idPersonal"
			where fecha between $1 and $2;
		`,[req.params.ini,req.params.fin])

		let contentDisposition = `attachment;filename=Solicitudes de Mantenimiento (${req.params.ini} - ${req.params.fin}).pdf`
		
		const stream = res.writeHead(200,{
			'Content-Type' : 'application/pdf',
			'Content-Disposition' : contentDisposition
		});
		solicitudesMantenimientoPDF.buildPDF(
			(chunk) => stream.write(chunk),
			() => stream.end(),
			result.rows
		)
	}catch(error){
		next(error)
	}
}

const get_BitacoraCTCs_PDF = async(req,res,next) => {
	try{
		const result = await pool.query(`
			SELECT * FROM "BitacoraCTCs"
			WHERE fecha BETWEEN $1 AND $2;
		`,[req.params.ini, req.params.fin]);

		let contentDisposition = `attachment;filename=Bitácora de CTCs (${req.params.ini} - ${req.params.fin}).pdf`
		
		const stream = res.writeHead(200,{
			'Content-Type' : 'application/pdf',
			'Content-Disposition' : contentDisposition
		});
		bitacoraCTCsPDF.buildPDF(
			(chunk) => stream.write(chunk),
			() => stream.end(),
			result.rows
		)
	}catch(error){
		next(error)
	}
}



module.exports = {
	get_Personal_PDF,
	get_Equipos_PDF,
	get_SolicitudesEquipo_PDF,
	get_SolicitudesMantenimiento_PDF,
	get_BitacoraCTCs_PDF
}