const addCero = require('../utils/tools.js')

const getFechaString = () => {
	let fecha = new Date()
	let dia = addCero(fecha.getDate()), mes = addCero(fecha.getMonth()+1);
	return `${dia}-${mes}-${fecha.getFullYear()}`
}

function extraerFecha(fecha){
	let fechaTmp = new Date(fecha);
	let tmp = fechaTmp.getDate() + " / " + getMes(fechaTmp.getMonth()) + " / " +fechaTmp.getFullYear()
	return tmp
}

function extraerHora(hora){
	if(hora === null){
		return "Sin registro"
	}else{
		let p = hora.split(":")
		return p[0] + ":" + p[1];
	}
}


function getMes(numero){
	switch(numero){
		case 0:
			return "Enero";
		case 1:
			return "Febrero";
		case 2:
			return "Marzo";
		case 3:
			return "Abril";
		case 4:
			return "Mayo";
		case 5:
			return "Junio";
		case 6:
			return "Julio";
		case 7:
			return "Agosto";
		case 8:
			return "Septiembre";
		case 9:
			return "Octubre";
		case 10:
			return "Noviembre";
		case 11:
			return "Diciembre";
		default:
			return "Inexistente";
	}
}

module.exports = {
	extraerFecha,
	extraerHora,
	getFechaString,
	getMes
}