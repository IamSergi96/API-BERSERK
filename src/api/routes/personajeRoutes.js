const express = require("express");
const characterRouter = express.Router();
const {getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter} = require("../controllers/personaje.controller");

//characterRouters.get
characterRouter.get("/", getCharacters)
characterRouter.get("/:id", getCharacter)
characterRouter.post("/", createCharacter)
characterRouter.patch("/:id", updateCharacter)
characterRouter.delete("/:id", deleteCharacter)

module.exports = characterRouter;
