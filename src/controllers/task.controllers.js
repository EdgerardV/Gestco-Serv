const pool = require('../db.js')

const getAll_Equipos = async (req, res) => {
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
		res.send(error.message)
	}
}

const get_Equipo_Id = async (req, res) => {
	console.log("parametros " + req.params.id)
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
						on "Equipos"."idPuesto" = "Puestos"."idPuesto"
				where "idEquipo" = $1;
		`,[req.params.id]);
		res.send(result.rows)
	}catch(error){
		res.send(error.message)
	}
}



module.exports = {
	getAll_Equipos,
	get_Equipo_Id
}