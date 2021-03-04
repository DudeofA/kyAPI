const router = require("express").Router();
const { createRandMeme, createMemeByName } = require("./meme.controller");

router.get("/", createRandMeme);
router.get("/gen", createMemeByName);

module.exports = router;
