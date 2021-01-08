const router = require("express").Router();
const { createRandMeme } = require("./meme.controller");

router.get("/", createRandMeme);
// router.get("/:id", createMemeByName);

module.exports = router;