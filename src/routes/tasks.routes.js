const { Router } = require('express');
const controllers = require('../controllers/task.controllers.js');

const router = Router();

router.get('/equipo', controllers.getAll_Equipos);
router.get('/:id', controllers.get_Equipo_Id);


module.exports = router;