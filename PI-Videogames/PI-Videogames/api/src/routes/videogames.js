const express = require("express");
const { Videogame, Genre, videogame_genre } = require("../db");
require("dotenv").config();
const router = express.Router();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const { API_KEY } = process.env;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length > 10) {
    const dbGame = await Videogame.findOne({
      where: { id: id },
      include: Genre,
    });

    return res.status(200).json(dbGame);
  }
  const { data } = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  const detail = {
    id: data.id,
    name: data.name,
    image: data.background_image,
    description: data.description_raw,
    release: data.released,
    rating: data.rating,
    platform: data.platforms.map((p) => "." + "  " + p.platform.name),
    genre: data.genres.map((g) => " - " + g.name),
  };

  return res.status(200).json(detail);
});
router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    const db = Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
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
    const { name, description, platform, release, rating, genres, image } =
      req.body;
    console.log(req.body);
    const game = await Videogame.create({
      id: uuidv4(),
      name: name,
      description: description,
      platform: platform,
      release: release,
      rating: rating,
      image: image,
    });
    await game.addGenre(genres);
    return res.json(game);
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

module.exports = router;
