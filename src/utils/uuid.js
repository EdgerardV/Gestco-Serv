const generateUUID = (entrada) =>{
	let ahora = new Date().getTime();

	let uuid = 'xxxxxxxxxx'.replace(/[x]/g, function(c){
		let aleatorio = (ahora +Math.random()*16) % 16 | 0;
		ahora = Math.floor(ahora/16);
		return (c == 'x' ? aleatorio : (aleatorio & 0x3 | 0x8)).toString(16);
	})
	return entrada + uuid;
}

module.exports = {
	generateUUID
}