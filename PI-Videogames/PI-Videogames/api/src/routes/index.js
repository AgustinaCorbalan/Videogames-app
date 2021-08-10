const express = require("express");
const games = require("./videogames");
const genres = require("./genre");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", games);
router.use("/genre", genres);

module.exports = router;
