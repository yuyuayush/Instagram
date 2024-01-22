const express = require("express");
const {getAll, getOne} = require("../controllers/index.js");
const router = express.Router();
router.get("/", getAll);

module.exports= router;