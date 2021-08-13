const express = require("express");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const router = express.Router();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const { API_KEY } = process.env;

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    const db = Videogame.findAll({
      include: {
        model: Genre,
        attributes: {
          include: ["name"],
        },
        through: {
          attributes: [],
        },
      },
    });
    const api1 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40&search=${name}`
    );
    const api2 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40&search=${name}`
    );
    const api3 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20&search=${name}`
    );
    Promise.all([db, api1, api2, api3]).then((resp) => {
      const [dataBase, api1Data, api2Data, api3Data] = resp;
      const result = dataBase.concat(
        api1Data.data.results,
        api2Data.data.results,
        api3Data.data.results
      );
      res.send(result);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, platform, release, rating, genre } = req.body;

    let platformString = platform.join(", ");
    console.log(platform);
    const game = await Videogame.create({
      id: uuidv4(),
      name,
      description,
      platform: platformString,
      release,
      rating,
    });

    const genresGame = await Genre.findAll({
      where: {
        name: genre,
      },
    });

    await game.addGenre(genresGame);
    console.log(genresGame);

    const response = await Videogame.findAll({
      include: Genre,
    });
    console.log(response);

    res.send({ response, msg: "Videogame created successfully!" });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const games = await Videogame.findAll({
      include: [
        {
          model: Genre,
        },
      ],
    });
    res.json(games);
  } catch (error) {
    next(error);
  }
});

// router.get('/:id', async (req, res, next) =>{
//   const {id} = req.params
//   try {
//     const gameId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

//   }
// })

// router.get("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const db = Videogame.findAll({
//       include: {
//         model: Genre,
//         attributes: {
//           include: ["name"],
//         },
//         through: {
//           attributes: [],
//         },
//       },
//     });
//     const api1 = await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`
//     );
//     const api2 = await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
//     );
//     const api3 = await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`
//     );

//     let game = await Promise.all([db, api1, api2, api3]).then((resp) => {
//       const [dataBase, api1Data, api2Data, api3Data] = resp;
//       const result = dataBase.concat(
//         api1Data.data.results,
//         api2Data.data.results,
//         api3Data.data.results
//       );
//       return result;
//     });

//     const games = game.find((el) => el.id === id);

//     res.send(games);
//   } catch (error) {
//     next(error);
//   }

//   try {
//     let video = await Videogame.findByPk(id);
//     return res.json(video);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get("/", async (req, res) => {
//   const search = req.query.search;
//   let allVideogames = await apiVideogames();
//   if (search) {
//     let videoName = await allVideogames.filter((game) =>
//       game.search.toLowerCase().includes(search.toLocaleLowerCase())
//     );
//     videoName.length
//       ? res.status(200).send(allVideogames)
//       : res.status(400).send("NO ESTÁ");
//   } else {
//     res.status(200).send(allVideogames);
//     console.log(allVideogames, "AAAAAAAAAAAAAAAAAA");
//   }
// });

// router.post("/", (req, res, next) => {
//   const { name, image, genres, platform, description } = req.body;

//   Videogame.create({
//     name,
//     image,
//     description,
//     platform,
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
