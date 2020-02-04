const express = require("express");
const router = express.Router();

const celebrities = require("./celebrities");
const movies = require("./movies");

router.use("/celebrities", celebrities);
router.use("/movies", movies);

router.get("/", (req, res, next) => res.render("index"));

module.exports = router;
