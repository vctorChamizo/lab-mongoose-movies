const express = require("express");
const router = express.Router();

const celebrities = require("./routes/celebrities");
const movies = require("./routes/movies");

app.use("/celebrities", celebrities);
app.use("/movies", movies);

router.get("/", (req, res, next) => res.render("index"));

module.exports = router;
