const express = require('express');
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');
const { getTematicas } = require('../controllers/controladorTematicas.js');

const routerGetTematicas = express.Router();

routerGetTematicas.get('/tematicas/consultar', verificarAutenticacion, getTematicas)

module.exports = { routerGetTematicas: routerGetTematicas }