const router = require("express").Router();

const partyController = require("../controllers/partyController");

// Rotas para festas
router
    .route("/parties")
    .post((req, res) => partyController.create(req, res))
    .get((req, res) => partyController.getAll(req, res));

// Rotas para uma festa específica
router
    .route("/parties/:id")
    .get((req, res) => partyController.get(req, res))
    .put((req, res) => partyController.update(req, res))
    .delete((req, res) => partyController.delete(req, res));

module.exports = router;