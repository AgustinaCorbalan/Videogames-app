const express = require("express");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const fetch = require("node-fetch");
const router = express.Router();
const axios = require("axios");

const { API_KEY } = process.env;

router.get("/", async (req, res, next) => {
  const apiVideogames = await axios.get(
    // me traigo los juegos de la API (faltan 60)
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`
  );

  var dbVideogames = Videogame.findAll(); // en dbVideogames me voy a guardar los juegos que se van a crear desde la db

  return Promise.all([apiVideogames, dbVideogames]) // cuando se ejecuten ambas
    .then((resultados) => {
      // capturo el resultado, de los juegos traidos desde la api y de la db
      var apiGames = resultados[0].data.results; // en apiGames en resultados, voy a tener en la posicion 0 a los juegos de la api
      var dbGames = resultados[1];
      // console.log("Estos son los videogamesApi", apiGames);
      // console.log("Database games", dbGames);

      apiGames = apiGames.map((games) => {
        // para cada juego de la api va a devolver un array con esos atributos
        return {
          id: games.id,
          name: games.name,
          image: games.background_image,
          released: games.released,
          rating: games.rating,
          platforms: games.platforms,
          description: games.description,
        };
      });
      dbGames = dbGames.map((g) => {
        // lo mismo para la db
        return {
          id: g.id,
          name: g.name,
          image: g.image,
          released: g.released,
          rating: g.rating,
          platforms: g.platforms,
          description: g.description,
        };
      });
      var allGames = apiGames.concat(dbGames); // uno los juegos tanto de la api como de db, para cuando lo solicite tenerlos todos en allGames, con esos atributos creados
      res.send(allGames);
      console.log(allGames);
    })
    .catch((error) => next(error));
});

router.post("/", async (req, res) => {
  const { name, description, platform, release } = req.body;
  try {
    const game = await Videogame.create({
      name,
      description,
      platform,
      release,
    });

    res.json(game);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let video = await Videogame.findByPk(id);
    return res.json(video);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/", (req, res) => {
//   const { name, image, genres } = req.body;

//   Videogame.create({
//     name,
//     image,
//   })
//     .then((createdGame) => {
//       return createdGame.setGenres(genres);
//     })
//     .then((gamesGenres) => {
//       res.json(gamesGenres);
//     })
//     .catch((error) => next(error));
// });

// router.get("/", async (req, res) => {
//   try {
//     const games = await Videogame.findAll({
//       include: [
//         {
//           model: Genre,
//         },
//       ],
//     });
//     res.json(games);
//   } catch (error) {
//     console.error("Error");
//   }
// });

// // router.get("/videogamesDb", (req, res) => {
// //   return Videogame.findAll() // es mi tabla Videogame creada
// //     .then((videogames) => {
// //       return res.json(videogames);
// //     });
// // });

// router.post("/", async (req, res) => {
//   const { name, description, release, rating, platform } = req.body;
//   const gamesCreated = await Videogame.create({});
// });

// // const { API_KEY } = process.env;

// // router.get("/", async (req, res) => {
// //   try {
// //     const data = await fetch(
// //       `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`
// //     );
// //     res.json(data.results);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // });

module.exports = router;
