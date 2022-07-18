const PDFDoc = require('pdfkit-construct');
const getFechaString = require('../fecha.js');

function buildPDF(dataCallback, endCallback, personal){
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
	doc.fontSize(20).text('Reporte del Personal',{
		align: 'center'
	})
	doc.fontSize(15);
	doc.text(`UNID Campus Uruapan` ,{
		align: 'left'
	})
	doc.text(`Fecha: ${getFechaString()}` ,{
		align: 'left'
	})

	const registros = personal.map( (element) => {
		const registro = {
			id: element.idPersonal,
			nombres: element.nombres,
			apellidoP: element.apellidoP,
			apellidoM: element.apellidoM,
			departamento: element.departamento,
			puesto: element.puesto,
			noEmpleado: element.noEmpleado
		}
		return registro;
	});
	doc.addTable([
		{key: 'id', label: 'Id', aling: 'left'},
		{key: 'nombres', label: 'Nombre', aling: 'left'},
		{key: 'apellidoP', label: 'Apellido Paterno', aling: 'left'},
		{key: 'apellidoM', label: 'Apellido Materno', aling: 'left'},
		{key: 'departamento', label: 'departamento', aling: 'left'},
		{key: 'puesto', label: 'puesto', aling: 'left'},
		{key: 'noEmpleado', label: 'Numero de empleado', aling: 'center'},
	], registros, {
		border:  {size: 0.1, color: '#000000'},
		width: "auto",
		striped: true,
		stripedColors: ["#FFFFFF","#E0E0E0"],
		cellsPadding: 5,
		marginLeft: 0,
		marginRight: 0,
		headAlign: 'center',
		headHeight : 25,
		headBackground : '#ffb500',
		cellsMaxWidth: 75
	})
	// doc construct end
	doc.render();
	doc.end();
}

module.exports = {buildPDF}