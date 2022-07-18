const PDFDoc = require('pdfkit-construct');
const {getFechaString, extraerFecha} = require('../fecha.js');

function buildPDF(dataCallback, endCallback, solicitudes){
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
	doc.fontSize(20).text('Reporte de\nSolicitudes de Mantenimiento',{
		align: 'center'
	})
	doc.fontSize(15);
	doc.text(`UNID Campus Uruapan` ,{
		align: 'left'
	})
	doc.text(`Fecha: ${getFechaString()}` ,{
		align: 'left'
	})
	const registros = solicitudes.map( (element) => {
		const registro = {
			id: element.idInformeMantenimiento,
			nombre: `${element.nombres} ${element.apellidoP} ${element.apellidoM}`,
			problema: element.problema,
			condicion: element.condicion,
			descripcion: element.descripcion,
			fecha: extraerFecha(element.fecha),
		}
		return registro;
	});
	doc.addTable([
		{key: 'id', label: 'Identificador', aling: 'left'},
		{key: 'nombre', label: 'Solicitante', aling: 'left'},
		{key: 'problema', label: 'Tipo de Problema', aling: 'left'},
		{key: 'condicion', label: 'Condición', aling: 'left'},
		{key: 'descripcion', label: 'Descripción', aling: 'left'},
		{key: 'fecha', label: 'Fecha', aling: 'left'},
	], registros, {
		border:  {size: 0.1, color: '#000000'},
		width: "auto",
		striped: true,
		stripedColors: ["#FFFFFF","#E0E0E0"],
		cellsPadding: 5,
		headAlign: 'center',
		headHeight : 25,
		headBackground : '#ffb500',
		cellsMaxWidth: 100,
		marginLeft: 20,
		marginRight: 20,
	})
	// doc construct end
	doc.render();
	doc.end();
}

module.exports = {buildPDF}