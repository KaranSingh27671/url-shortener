const express = require("express");
const { redirectUrl } = require("../controllers/redirectController");

const router = express.Router();

router.get("/:shortCode", redirectUrl);

module.exports = router;