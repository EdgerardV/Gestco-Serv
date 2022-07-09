const { Router } = require('express');
const controllers = require('../controllers/task.controllers.js');

const router = Router();

//	GETS
router.get('/bitacoraCTC/registros',controllers.get_BitacoraCTC_Registros)
router.get('/solicitudes/mantenimiento',controllers.get_Solicitudes_Mantenimiento);
router.get('/solicitudes/equipo',controllers.get_Solicitudes_Equipo);
router.get('/encargados/equipo',controllers.get_EquipoDeEncargado);
router.get('/encargados',controllers.getAll_Encargados);
router.get('/equipos', controllers.getAll_Equipos);
router.get('/equipo',controllers.get_Single_Equipo);
router.get('/login',controllers.get_Access)

//	POSTS
router.post('/bitacoraCTC/registrar',controllers.post_BitacoraCTC_Registrar)
router.post('/solicitar/equipo',controllers.post_Solicitar_Equipo)
router.post('/solicitar/mantenimiento',controllers.post_Solicitar_Mantenimiento)

//	UPDATES
router.put('/bitacoraCTC/salir',controllers.update_BitacoraCTC_Salida)

//	DELETES
router.delete('/solicitar/equipo',controllers.delete_Solicitud_Equipo)
router.delete('/solicitar/mantenimiento',controllers.delete_Solicitud_Mantenimiento)


//	EXPORTS
module.exports = router;