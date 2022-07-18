const pool = require('../db.js')
const {generateUUID} = require('../utils/uuid.js')

//	Functions
function validarCredenciales(pssIn, pssServ){
	return pssIn == pssServ
}

async function query_Single_Equipo(idEquipo){
	return await pool.query(`select "Dispositivos"."idDispositivo",
			"Modelos"."descripcion",
			"Modelos"."marca",
			"Modelos"."modelo",
			"Dispositivos"."fechaAdquisición"
			from "Dispositivos"
			inner join "Modelos"
				on "Dispositivos"."idModelo" = "Modelos"."idModelo"
			where "idEquipo" = $1;`,[idEquipo]);
}

async function query_EquipDePersonal(idPersonal){
	return await pool.query(`
		select "idEquipo" from "Encargados" where "idPersonal" = $1`,
	[idPersonal]);
}



// GETS
const get_Access = async (req, res, next) => {
	try{
		var entradas = [req.headers.usuario, req.headers.password];
		const result = await pool.query(`
		SELECT "idCuentaDeAcceso",
			"CuentasDeAcceso"."idPersonal",
			"Personal"."nombres",
			"Personal"."apellidoP",
			"Personal"."apellidoM",
			"usuario",
			"password"
			FROM public."CuentasDeAcceso"
			inner join "Personal" 
				on "CuentasDeAcceso"."idPersonal" = "Personal"."idPersonal"
		WHERE "usuario" = $1`,[entradas[0]]);

		if(result.rowCount != 1){
			if(result.rowCount > 1){
				next(new Error("Error: usuario duplicado"));
			}
			if(result.rowCount == 0){
				next(new Error("Error: usuario no encontrado"));
			}
		}else{
			var contraseña = result.rows[0].password;
			const resultado = validarCredenciales(entradas[1],contraseña)
			res.json({
				idCuenta: result.rows[0].idCuentaDeAcceso,
				idPersonal: result.rows[0].idPersonal,
				nombres: result.rows[0].nombres,
				aPaterno: result.rows[0].apellidoP,
				aMaterno: result.rows[0].apellidoM,
				acceso: resultado
			});
		}
	}catch(error){
		next(error)
	}
}

const get_Single_Equipo = async (req, res, next) =>{
	try{
		const result = await query_Single_Equipo(req.headers.id);
		res.json(result.rows)
	}catch(error){
		next(error)
	}
}

const get_Solicitudes_Equipo = async (req, res, next) =>{
	try{
		const result = await pool.query(`
			SELECT "idSolicitudesDeEquipo",
				"idCuentaDeAcceso",
				cantidad,
				descripcion,
				justificacion,
				mes,
				date(fecha)
			FROM "SolicitudesDeEquipo"
			where "idCuentaDeAcceso" = $1;
		`,[req.headers.idcuenta]);

		res.json(result.rows)
	}catch(error){
		next(error)
	}
}

const get_Solicitudes_Mantenimiento = async (req, res, next) =>{
	try{
		const equipo = await query_EquipDePersonal(req.headers.idpersonal)
		const result = await pool.query(`
			select * from "InformeMantenimiento" where "idEquipo" = $1;	
		`,[equipo.rows[0].idEquipo]);
		
		res.json(result.rows)
	}catch(error){
		next(error)
	}
}

const get_EquipoDeEncargado = async (req, res, next) =>{
	try{
		const encargadoRslt = await pool.query(`
		select "idEquipo" from "Encargados" where "idPersonal" = $1;
		`,[req.headers.id])

		let result = await query_Single_Equipo(encargadoRslt.rows[0].idEquipo);
		res.json(result.rows)
	}catch(error){
		next(error)
	}
}

const getAll_Encargados = async(req,res,next)=>{
	try{
		const result = await pool.query(`		
			select
				"Encargados"."idEncargado",
				"Encargados"."idEquipo",
				"Personal"."nombres",
				"Personal"."apellidoP",
				"Personal"."apellidoM",
				"Departamentos"."departamento",
				"Puestos"."puesto"
			from "Encargados"
				inner join "Personal"
					on "Encargados"."idPersonal" = "Personal"."idPersonal"
				inner join "Departamentos"
					on "Personal"."idDepartamento" = "Departamentos"."idDepartamento"
				inner join "Puestos"
					on "Personal"."idPuesto" = "Puestos"."idPuesto";
		`);
		res.json(result.rows)
	}catch(error){
		next(error)
	}
}

const getAll_Equipos = async (req, res, next) => {
	try{
		const result = await pool.query(`
			select "Equipos"."idEquipo",
				"Equipos"."numeracion",
				"Departamentos"."departamento",
				"Puestos"."puesto"
				from public."Equipos"
					inner join "Departamentos"
						on "Equipos"."idDepartamento" = "Departamentos"."idDepartamento"
					inner join "Puestos"
						on "Equipos"."idPuesto" = "Puestos"."idPuesto";
		`);
		res.send(result.rows)
	}catch(error){
		next(error)
	}
}

const get_BitacoraCTC_Registros = async (req, res, next) => {
	try{
		const result = await pool.query(`
			select * from "BitacoraCTCs" where fecha = current_date order by "horaEntrada";
		`);

		res.json(result.rows)
	}catch(error){
		next(error)
	}
}


// POSTS
const post_Solicitar_Equipo = async(req,res,next) => {
	try{
		const reslt = await pool.query(`
			INSERT INTO "SolicitudesDeEquipo"(
				"idSolicitudesDeEquipo",
				"idCuentaDeAcceso",
				cantidad,
				descripcion,
				justificacion,
				mes,
				fecha
			)
			values($1,$2,$3,$4,$5,$6,current_date)
		`,[
			generateUUID('solieq-'),
			req.body.idCuentaDeAcceso,
			req.body.cantidad,
			req.body.descripcion,
			req.body.justificacion,
			req.body.mes
		]);
		if(reslt.rowCount > 0){
			res.json(
				{
					exito: true,
					total: reslt.rowCount
				}
			)
		}else{
			next(new Error("Error al crear elemento"))
		}
	}catch(error){
		next(error)
	}
}

const post_Solicitar_Mantenimiento = async(req,res,next) => {
	try{
		const equipo = await query_EquipDePersonal(req.body.idPersonal)
		const result = await pool.query(`
			INSERT INTO "InformeMantenimiento"(
				"idInformeMantenimiento",
				"idEquipo",
				problema,
				condicion,
				descripcion,
				fecha
			)
				VALUES ($1, $2, $3, $4, $5, current_date);
		`,[
			generateUUID('infMant-'),
			equipo.rows[0].idEquipo,
			req.body.problema,
			req.body.condicion,
			req.body.descripcion
		]);

		res.json({
			exito: true,
			total: result.rowCount
		})
	}catch(error){
		next(error)
	}
}

const post_BitacoraCTC_Registrar = async(req,res,next) => {
	try{
		const result = await pool.query(`
			INSERT INTO "BitacoraCTCs"(
				"idBitacoraCTCs",
				matricula,
				"idCTC",
				nombres,
				licenciatura,
				"horaEntrada",
				fecha
			)
				VALUES ($1, $2, $3, $4, $5, current_time, current_date);
		`,[
			generateUUID('regCTC-'),
			req.body.matricula,
			req.body.CTC,
			req.body.nombres,
			req.body.licenciatura
		]);

		res.json({
			exito: true,
			total: result.rowCount
		})
	}catch(error){
		next(error)
	}
}



//	DELETES
const delete_Solicitud_Equipo = async(req,res,next) => {
	try{
		const result = await pool.query(`
			DELETE FROM "SolicitudesDeEquipo" where "idSolicitudesDeEquipo" = $1;
		`,[req.headers.id]);
		res.json(
			{
				mensaje : "Eliminación exitosa",
				cantidad : result.rowCount
			}
		)
	}catch(error){
		next(error)
	}
}

const delete_Solicitud_Mantenimiento = async(req,res,next) => {
	try{
		const result = await pool.query(`
			DELETE FROM "InformeMantenimiento" where "idInformeMantenimiento" = $1;
		`,[req.headers.id]);
		res.json(
			{
				mensaje : "Eliminación exitosa",
				cantidad : result.rowCount
			}
		)
	}catch(error){
		next(error)
	}
}



//	UPDATES
const update_BitacoraCTC_Salida = async(req,res,next) => {
	console.log("hola")
	try{
		const result = await pool.query(`
			UPDATE "BitacoraCTCs"
				SET "horaSalida"= current_time
				WHERE "idBitacoraCTCs" = $1;
		`,[req.body.id]);
		console.log(result)
		res.send(result)
	}catch(error){
		next(error)
	}
}

module.exports = {
	//	GETS
	get_Access,
	get_EquipoDeEncargado,
	getAll_Encargados,
	get_Solicitudes_Mantenimiento,
	get_Solicitudes_Equipo,
	get_BitacoraCTC_Registros,
	getAll_Equipos,
	get_Single_Equipo,
	
	//	POSTS
	post_Solicitar_Equipo,
	post_Solicitar_Mantenimiento,
	post_BitacoraCTC_Registrar,

	//	PUTS
	update_BitacoraCTC_Salida,

	//	DELETES
	delete_Solicitud_Equipo,
	delete_Solicitud_Mantenimiento
}