const { Router } = require("express");
require("dotenv").config();
const fetch = require("node-fetch");

const router = Router();

const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    const data = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`
    );
    res.json(data.results);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
