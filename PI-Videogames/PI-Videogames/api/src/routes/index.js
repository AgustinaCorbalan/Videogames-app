const { Router } = require("express");
const { Genre, Videogame } = require("../db.js");
const videogamesRoutes = require("./videogames");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogamesRoutes);

module.exports = router;
