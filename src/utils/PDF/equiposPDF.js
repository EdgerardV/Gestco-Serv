const PDFDoc = require('pdfkit-construct');
const getFechaString = require('../fecha.js');

function buildPDF(dataCallback, endCallback, equipos){
	const doc = new PDFDoc({
		size: 'A4',
		margins: {top: 20, left: 10, right: 10, bottom: 20},
		bufferPages: true,
	});
	doc.on('data',dataCallback)
	doc.on('end',endCallback)
	
	// doc construct start
	doc.setDocumentHeader({}, ()=>{
		doc.image('src/images/UNID_Logo_Fondo.png', 460, 10, {height: 60})
	})
	doc.fontSize(20).text('Reporte de equipos',{
		align: 'center'
	})
	doc.fontSize(15);
	doc.text(`UNID Campus Uruapan` ,{
		align: 'left'
	})
	doc.text(`Fecha: ${getFechaString()}` ,{
		align: 'left'
	})

	const registros = equipos.map( (element) => {
		const registro = {
			id: element.idEquipo,
			encargado: element.nombres + " " + element.apellidoP + " " + element.apellidoM,
			descripcion: element.descripcion,
			marca: element.marca,
			modelo: element.modelo,
			departamento: element.departamento,
			puesto: element.puesto
		}
		return registro;
	});
	doc.addTable([
		{key: 'id', label: 'Equipo', aling: 'left'},
		{key: 'encargado', label: 'Encargado', aling: 'left'},
		{key: 'descripcion', label: 'Descripción', aling: 'left'},
		{key: 'marca', label: 'Marca', aling: 'left'},
		{key: 'modelo', label: 'Modelo', aling: 'left'},
		{key: 'departamento', label: 'Departamento', aling: 'left'},
		{key: 'puesto', label: 'Puesto', aling: 'left'}
	], registros, {
		border:  {size: 0.1, color: '#000000'},
		width: "fill-body",
		striped: true,
		stripedColors: ["#FFFFFF","#E0E0E0"],
		cellsPadding: 5,
		headAlign: 'center',
		headHeight : 25,
		headBackground : '#ffb500',
		cellsMaxWidth: 75,
		marginLeft: 45,
		marginRight: 45,
	})
	// doc construct end
	doc.render();
	doc.end();
}

module.exports = {buildPDF}