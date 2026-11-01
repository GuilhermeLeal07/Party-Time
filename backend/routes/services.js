const router = require("express").Router();

const serviceController = require("../controllers/serviceController");

// Rotas para serviços
router
    .route("/services")
    .post((req, res) => serviceController.create(req, res))
    .get((req, res) => serviceController.getAll(req, res));

// Rotas para um serviço específico
router
    .route("/services/:id")
    .get((req, res) => serviceController.get(req, res))
    .put((req, res) => serviceController.update(req, res))
    .delete((req, res) => serviceController.delete(req, res));

module.exports = router;