const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/login").login);

module.exports = router;
