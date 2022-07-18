const addCero = (numero) => {
	if(numero < 10){
		return "0" + numero
	}else{
		return `${numero}`
	}
}

module.exports = addCero;