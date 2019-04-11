const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controller/BoxController');
const FileController = require('./controller/FileController');

/*
Quatro metodos
GET -> quando for buscar uma info do serviço/api
POST -> quando for criar algo
PUT -> quando for editar
DELETE -> quando for deletar
*/

routes.post('/boxes', BoxController.store);

//
routes.get("/boxes/:id", BoxController.show);

//permiter upload de apenas um arquivo por vez (para mais mudar de single para array)
routes.post(
    //:id significa que se espera parametros do usuário
    "/boxes/:id/files", 
    multer(multerConfig).single('file'), 
    FileController.store
);

module.exports = routes;