const router = require("express").Router();

// Importação das rotas
const servicesRouter = require("./services");
const partyRouter = require("./parties");

// Registro das rotas
router.use("/", servicesRouter);
router.use("/", partyRouter);

module.exports = router;