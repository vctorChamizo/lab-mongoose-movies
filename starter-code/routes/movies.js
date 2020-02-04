const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.get("/", async (req, res, next) => {
  try {
    console.log("Entro en movies");
    const movies = await Movie.find();
    res.render("movies/index", { title: "Movies | List", movies });
  } catch (err) {
    console.error(err);
    next();
  }
});

router.get("/new", async (req, res, next) => {
  res.render("movies/new", { title: "Add Movie" });
});

router.post("/new", async (req, res, next) => {
  const movie = req.body;
  try {
    await Movie.create(movie);
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    res.render("/movies/new");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    next();
  }
});

router.get("/edit/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    res.render("movies/edit", {
      title: `Edit | ${movie.title}`,
      movie
    });
  } catch (err) {
    console.error(err);
    next();
  }
});

router.post("/edit/:id", async (req, res, next) => {
  const { title, genre, plot } = req.body;
  const id = req.params.id;
  try {
    await Movie.findByIdAndUpdate(id, { title, genre, plot });
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    res.render("movies/show", {
      title: `Details | ${movie.title}`,
      movie
    });
  } catch (err) {
    console.error(err);
    next();
  }
});

module.exports = router;
