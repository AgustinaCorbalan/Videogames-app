const express = require("express");
const { Genre } = require("../db");
// require("dotenv").config();
// const fetch = require("node-fetch");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("funcionaaa");
});
router.get("/", async (req, res, next) => {
  try {
    const genres = await Genre.findAll(); // me traigo los genres de la db.
    console.log(genres);
    res.json(genres);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    const createdGenre = await Genre.create({
      name,
    });
    res.json(createdGenre);
  } catch (error) {
    next({ msg: error, status: 500 });
  }
});

module.exports = router;
