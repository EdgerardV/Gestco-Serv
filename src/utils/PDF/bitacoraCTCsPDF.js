const PDFDoc = require('pdfkit-construct');
const {getFechaString, extraerFecha, extraerHora} = require('../fecha.js');

function buildPDF(dataCallback, endCallback, entradas){
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
	doc.fontSize(20).text('Bitácora de CTCs',{
		align: 'center'
	})
	doc.fontSize(15);
	doc.text(`UNID Campus Uruapan` ,{
		align: 'left'
	})
	doc.text(`Fecha: ${getFechaString()}` ,{
		align: 'left'
	})

	const registros = entradas.map( (element) => {
		const registro = {
			CTC: element.idCTC,
			nombres: element.nombres,
			matricula: element.matricula,
			licenciatura: element.licenciatura,
			horaEntrada: extraerHora(element.horaEntrada),
			horaSalida: extraerHora(element.horaSalida),
			fecha: extraerFecha(element.fecha)
		}
		return registro;
	});

	doc.addTable([
		{key: 'CTC', label: 'CTC', aling: 'left'},
		{key: 'nombres', label: 'Nombres', aling: 'left'},
		{key: 'matricula', label: 'Matricula', aling: 'left'},
		{key: 'licenciatura', label: 'Licenciatura', aling: 'left'},
		{key: 'horaEntrada', label: 'Hora de Entrada', aling: 'left'},
		{key: 'horaSalida', label: 'Hora de Salida', aling: 'left'},
		{key: 'fecha', label: 'Fecha', aling: 'left'}
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