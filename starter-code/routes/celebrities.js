const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/index", {
      title: "Celebrities | List",
      celebrities
    });
  } catch (err) {
    console.error(err);
    next();
  }
});

router.get("/new", async (req, res, next) => {
  res.render("celebrities/new", { title: "Add Celebrity" });
});

router.post("/new", async (req, res, next) => {
  const celebrity = req.body;
  try {
    await Celebrity.create(celebrity);
    res.redirect("/celebrities");
  } catch (err) {
    console.error(err);
    res.render("/celebrities/new");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Celebrity.findByIdAndRemove(id);
    res.redirect("/celebrities");
  } catch (err) {
    console.error(err);
    next();
  }
});

router.get("/edit/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const celebrity = await Celebrity.findById(id);
    console.log(celebrity);
    res.render("celebrities/edit", {
      title: `Edit | ${celebrity.name}`,
      celebrity
    });
  } catch (err) {
    console.error(err);
    next();
  }
});

router.post("/edit/:id", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const id = req.params.id;
  try {
    await Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (err) {
    console.error(err);
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render("celebrities/show", {
      title: `Details | ${celebrity.name}`,
      celebrity
    });
  } catch (err) {
    console.error(err);
    next();
  }
});

module.exports = router;
